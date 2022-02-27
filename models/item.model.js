const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true},
    image: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true}
})

module.exports = Item = mongoose.model("items", itemSchema);