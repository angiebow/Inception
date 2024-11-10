const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router(); 

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

       const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
//     if (!token) return res.sendStatus(401).json({ message: 'Unauthorized' });

//     jwt.verify(token, 'OjeICoYoBSWHn4gaq7tTBfmV1nKLiYxH', (err, decoded) => {
//         if (err) return res.sendStatus(403).json({ message: 'Forbidden' });
//         req.userId = decoded.id; // Attach the user ID to the request
//         next();
//     });
// };

router.use((req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
    if (!token) return res.status(401).json({ message: "Access Denied" });
    
    try {
        const decoded = jwt.verify(token, "OjeICoYoBSWHn4gaq7tTBfmV1nKLiYxH");
        req.userId = decoded.userId; // Assuming the token payload has an `id` field
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
});

router.get('/me', (req, res) => {
    res.json({ message: 'User details', userId: req.userId});
});

module.exports = router; 