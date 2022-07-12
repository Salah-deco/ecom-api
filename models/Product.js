const mongoose = require('mongoose');

// create Product Schema
const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        categories: {type: Array},
        color: {type: String },
        size: {type: String },
        price: {type: Number, required: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);