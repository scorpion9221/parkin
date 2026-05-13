const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiptId: { type: String, required: true, unique: true },
  destinationId: Number,
  destinationName: { type: String, required: true },
  destinationLocation: { type: String, required: true },
  spot: { type: String, required: true },
  spotType: { type: String, default: 'Regular' },
  pricePerHour: Number,
  startTime: Date,
  endTime: Date,
  dateLabel: String,
  timeIn: String,
  timeOut: String,
  durationText: String,
  amount: { type: Number, required: true },
  status: { type: String, enum: ['active','completed','cancelled'], default: 'completed' },
  paymentMethod: String,
  paymentLabel: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
