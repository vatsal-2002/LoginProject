const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, mobile, city, state, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({ name, email, mobile, city, state, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email mobile city state');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error });
    }
};
