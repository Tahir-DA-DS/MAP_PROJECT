const paymentData = require("../model/paymentConfirmation");
const customerData = require("../model/customerData");

const { body, validationResult } = require("express-validator");

CreatepaymentConfirmation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { applicationNo, mapVendorId, amountPaid, datePaid } = req.body;

  try {
    const customerExists = await customerData.findOne({ applicationNo });
    if (!customerExists) {
      return res
        .status(404)
        .json({
          message: "Customer with provided application number does not exist.",
        });
    }

    const { mapNumber } = customerExists;

    const paymentExist = await paymentData.findOne({ applicationNo });
    if (paymentExist) {
      return res.status(404).json({ message: "payment already exist." });
    }

    let newPayment = new paymentData({
      applicationNo,
      mapVendorId,
      amountPaid,
      datePaid: new Date(datePaid),
    });

    await newPayment.save();
    res.status(201).json({
      applicationNo,
      mapNumber,
      mapVendorID: mapVendorId,
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "Payment record with this application number exist already",
        });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOnepayment = async (req, res) => {
  const applicationNo = req.params.applicationNo.toString();

  try {
    const singlePayment = await paymentData.findOne({
      applicationNo: applicationNo,
    });
    if (!singlePayment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    res.status(200).json(singlePayment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getallPayment = async (req, res) => {
  try {
    const allPayments = await paymentData.find();
    res.status(200).json(allPayments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { CreatepaymentConfirmation, getOnepayment, getallPayment };
