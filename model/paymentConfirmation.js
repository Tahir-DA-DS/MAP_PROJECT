const mongoose = require('mongoose');

const paymentConfirmationSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
    unique: true
  },
  mapVendorId: {
    type: String,
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  datePaid: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // `timestamps` option adds `createdAt` and `updatedAt` fields

const PaymentConfirmation = mongoose.model('PaymentConfirmation', paymentConfirmationSchema);

module.exports = PaymentConfirmation;
