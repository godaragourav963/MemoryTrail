const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
    );
};

exports.registerUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
        return res.status(400).json({
        success: false,
        message: "All fields are required"
        });
    }

    // 2️⃣ Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
        success: false,
        message: "User already exists"
        });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    // 5️⃣ Return response with token
    res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
        id: user._id,
        name: user.name,
        email: user.email
        }
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
};

exports.loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
        return res.status(400).json({
        success: false,
        message: "Email and password required"
        });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
        success: false,
        message: "Invalid credentials"
        });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
        success: false,
        message: "Invalid credentials"
        });
    }

    // 4️⃣ Return token
    res.json({
        success: true,
        token: generateToken(user._id),
        user: {
        id: user._id,
        name: user.name,
        email: user.email
        }
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error"
    });
    }
};