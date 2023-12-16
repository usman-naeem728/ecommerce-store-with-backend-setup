const express = require('express')
const router = express.Router()
const User = require('../models/Users.js')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser.js')
const JWT_SECRET = "thisismyCode";
// create a user 
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('contactno')
], async (req, res) => {
    const errors = validationResult(req);
    // if there are errors return bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check weather user with this email exits
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry user exsit with this email" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            contactno: req.body.contactno
        })
        const data ={
            user:{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // res.json(user)
        res.json({authToken})
    }
    catch (error) { 
        // console.log(err);
        res.json({ error: "please ", message: error.message })
    }
})

// authenticate a user
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
 // if there are errors return bad request
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const {email , password} = req.body;

try{
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error:'enter correct credentials'})
    }
    //comparing password user enters from database by converting it in to hash
     const passCompare = await bcrypt.compare(password,user.password)
     if(!passCompare){
        return res.status(400).json({error:'enter correct credentials'})
     }
     const data = {
        user:{
            id : user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken})

} catch (error) { 
    // console.log(err);
    res.status(500).send({ error: "internal server error occured"})
}

})

// get login user details

router.get('/getuser', fetchuser , async (req,res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
 } catch (error) { 
    console.error(error);
    res.status(500).send({ error: "internal server error occured"})
}
})

module.exports = router