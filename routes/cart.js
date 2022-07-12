const router = require('express').Router();
const CryptoJS = require('crypto-js');
const Cart = require('../models/Cart');

const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('./verifyToken');

// Create 
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();

        res.status(200).json(savedCart);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        res.status(200).json(updatedCart);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        console.log(deletedCart)
        res.status(200).json("Cart has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET USER CART
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
   
    try {
        const carts = await Cart.find();

        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;