const mongoose = require('mongoose')
const { Schema } = mongoose


const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('product', NotesSchema);