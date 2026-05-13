const express = require('express');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();

router.patch('/top-up', protect, async (req, res) => {
  const amount = Number(req.body.amount || 0);
  if(amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero.' });
  const user = await User.findById(req.user._id);
  user.walletBalance += amount;
  await user.save();
  res.json({ walletBalance: user.walletBalance });
});

router.patch('/transfer', protect, async (req, res) => {
  const amount = Number(req.body.amount || 0);
  if(amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero.' });
  const user = await User.findById(req.user._id);
  if(user.walletBalance < amount) return res.status(400).json({ message: 'Not enough balance.' });
  user.walletBalance -= amount;
  await user.save();
  res.json({ walletBalance: user.walletBalance });
});

module.exports = router;
