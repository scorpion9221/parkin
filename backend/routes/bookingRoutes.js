const express = require('express');
const Booking = require('../models/Booking');
const protect = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ bookings });
});

router.patch('/:id/cancel', protect, async (req, res) => {
  const query = { user: req.user._id, $or: [{ receiptId: req.params.id }] };
  if(req.params.id.match(/^[0-9a-fA-F]{24}$/)) query.$or.push({ _id: req.params.id });
  const booking = await Booking.findOneAndUpdate(query, { status: 'cancelled' }, { new: true });
  if(!booking) return res.status(404).json({ message: 'Booking not found.' });
  res.json({ booking });
});

module.exports = router;
