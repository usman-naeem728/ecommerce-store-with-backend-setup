const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const fetchUser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

//Route1 get all notes
router.get('/fetchallproducts', fetchUser, async (req, res) => {
    const product = await Product.find({ user: req.user.id });
    res.json(product)
})

//Router 2 adding notes
router.post('/addproduct', fetchUser, [
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


// Route 3 : updateing exsiting note
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4 : deleteing exsiting note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // checking user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "note has been deleted successfully", "note": note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router