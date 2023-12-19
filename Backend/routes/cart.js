const express = require('express')
const router = express.Router()
const Product = require('../models/Cartproduct')
const fetchUser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

//Route1 get all products in cart
router.get('/fetchallcartproducts', fetchUser, async (req, res) => {
    const product = await Product.find({ user: req.user.id });
    res.json(product)
})

//Router 2 adding products in cart
router.post('/addcartproduct', fetchUser, [
    body('productname'),
    body('price'),
    body('quantity')
], async (req, res) => {
    const { productname, price, quantity } = req.body

    // if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const product = new Product({
        productname, price, quantity, user: req.user.id
    })

    const addProduct = await product.save()
    res.send(addProduct)

})


// Route 3 : updating quantity exsiting product in cart 
router.put('/updatecartquantity/:id', fetchUser, async (req, res) => {
    const { quantity } = req.body;
    try {
        // Create a newNote object
        const newCartpdt = {};
        if (quantity) { newCartpdt.quantity = quantity };

        // Find the product to be updated and update it
        let prodt = await Product.findById(req.params.id);
        if (!prodt) { return res.status(404).send("Not Found") }

        if (prodt.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        prodt = await Product.findByIdAndUpdate(req.params.id, { $set: newCartpdt }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4 : deleteing product from cart
router.delete('/deletecartproduct/:id', fetchUser, async (req, res) => {

    try {

        // Find the note to be updated and update it
        let prodt = await Product.findById(req.params.id);
        if (!prodt) { return res.status(404).send("Not Found") }

        // checking user own this note
        if (prodt.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        prodt = await Product.findByIdAndDelete(req.params.id)
        res.json({ "success": "Product has been deleted successfully", "Product": prodt });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router