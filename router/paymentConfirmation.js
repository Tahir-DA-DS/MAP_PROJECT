const express = require("express");
const cors = require('cors')
const router = express.Router()
const {CreatepaymentConfirmation, getOnepayment, getallPayment, paymentDownload} = require('../controller/paymentConfirmation')


router.post('/paymentConfirm', CreatepaymentConfirmation)
router.get('/paymentConfirm/:applicationNo', getOnepayment)
router.get('/payments', getallPayment)
router.get('/payments/download', paymentDownload)
module.exports = router