const router = require('express').Router();
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');

const { 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('./verifyToken');

// Create Order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();

        res.status(200).json(savedOrder);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Update Order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        console.log(deletedOrder)
        res.status(200).json("Order has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET USER ORDERS
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
   
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET MONTHLY INCOME
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(lastMonth.setMonth(date.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    $month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;