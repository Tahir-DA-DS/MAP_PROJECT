const express = require("express");
const cors = require('cors')
const router = express.Router()
const {loginController} = require('../controller/userAdmin')
const {createData, getallCustomer, getOneCustomer} = require('../controller/customerData')
const verifyToken = require('../middleware/verifyUser')

router.post('/login', cors(), loginController)

router.post('/sendProjectData', verifyToken, cors(),  createData)
router.get('/customers', verifyToken, cors(), getallCustomer)
router.get('/customers/:appId', verifyToken, cors(),  getOneCustomer)

module.exports = router