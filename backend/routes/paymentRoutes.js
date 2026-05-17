const express = require('express');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();

function receiptId(){
  return `PK-${Math.floor(1000 + Math.random()*9000)}-${Math.random().toString(36).slice(2,4).toUpperCase()}`;
}
function durationText(hours, minutes){ return `${Number(hours || 0)}h ${Number(minutes || 0)}m`; }
function addMinutes(date, mins){ return new Date(date.getTime() + mins * 60000); }
function readableDate(value){
  const d = new Date(value + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
}
function paymentLabel(method, details = {}){
  if(method === 'Card') return `•••• ${details.cardLast4 || '4242'} (Visa)`;
  if(method === 'Wallet') return `${details.walletProvider || 'Mobile Wallet'}`;
  return 'Parkin Wallet';
}


router.post('/checkout', protect, async (req, res) => {
    
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
  try {

    const body = req.body;
    const amount = Number(body.amount || 0);

    const start = new Date(`${body.date}T${body.timeIn || '14:30'}:00`);
    const totalMinutes = Number(body.hours || 0) * 60 + Number(body.minutes || 0);
    const end = addMinutes(start, totalMinutes);
    const details = body.paymentDetails || {};

    const booking = await Booking.create({
      user: req.user._id,
      receiptId: receiptId(),
      destinationId: body.destinationId,
      destinationName: body.destinationName,
      destinationLocation: body.destinationLocation,
      spot: body.spot,
      spotType: body.spotType,
      pricePerHour: body.pricePerHour,
      startTime: start,
      endTime: end,
      dateLabel: readableDate(body.date),
      timeIn: body.timeIn,
      timeOut: end.toTimeString().slice(0,5),
      durationText: durationText(body.hours, body.minutes),
      amount,
      status: 'completed',
      paymentMethod: body.paymentMethod,
      paymentLabel: paymentLabel(body.paymentMethod, details)
    });

    const payment = await Payment.create({
      user: req.user._id,
      booking: booking._id,
      method: body.paymentMethod,
      amount,
      cardLast4: details.cardLast4,
      walletProvider: details.walletProvider,
      walletNumber: details.walletNumber
    });

    return res.status(201).json({
      booking,
      payment,
      user: { walletBalance: req.user.walletBalance }
    });

  } catch (err) {
    console.error("❌ PAYMENT ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
