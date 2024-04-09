const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  applicationNo:{ type: String, required: true},
  customerName: {type: String, required: true},
  customerAddress: {type: String, required: true},
  customerTelephone: {type: String, required: true},
  customerEmail: {type: String, required: true},
  city: {type: String, required: true},
  district: {type: String, required: true},
  zone: {type: String, required: true},
  mapNumber:{type: String},
  mapVendorId:{type:String, required: true}
});




module.exports = mongoose.model('customerData', userSchema);