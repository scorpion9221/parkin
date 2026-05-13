const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();

function signToken(id){
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function publicUser(user){
  return { id: user._id, name: user.name, email: user.email, phone: user.phone, walletBalance: user.walletBalance };
}

router.post('/register', async (req, res) => {
  try{
    const { name, email, phone, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if(exists) return res.status(409).json({ message: 'Email already exists. Please login.' });
    const user = await User.create({ name, email, phone, password });
    res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email).toLowerCase() });
    if(!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ token: signToken(user._id), user: publicUser(user) });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', protect, async (req, res) => {
  res.json({ user: publicUser(req.user) });
});

module.exports = router;
