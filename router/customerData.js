const express = require("express");
const cors = require('cors')
const router = express.Router()
const {loginController} = require('../controller/userAdmin')
const {createData, getallCustomer, getOneCustomer} = require('../controller/customerData')
const verifyToken = require('../middleware/verifyUser')

router.post('/login', loginController)

router.post('/sendProjectData', verifyToken,  createData)
router.get('/customers', verifyToken,  getallCustomer)
router.get('/customers/:appId', verifyToken,  getOneCustomer)

module.exports = router