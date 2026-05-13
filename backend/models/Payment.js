const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid','failed','refunded'], default: 'paid' },
  cardLast4: String,
  walletProvider: String,
  walletNumber: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
