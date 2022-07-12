const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");

// Register routes
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
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
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        console.log(user)
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const decryptPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        decryptPassword !== req.body.password && res.status(401).json("Wrong credentials!");
        // successfull
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch(err) {
        console.log("error", err.message);
        res.status(500).json(err);
    }
});

module.exports = router;