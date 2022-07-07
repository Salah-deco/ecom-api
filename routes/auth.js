const router = require('express').Router();
const User = require('../models/User');

// Register routes
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        // send response to client side
        res.status(201).json(savedUser);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;