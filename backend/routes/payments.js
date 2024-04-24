// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment,  } = require("../controllers/Payments")
const { isClient } = require("../middleware")
router.post("/capturePayment", isClient, capturePayment)
router.post("/verifyPayment",isClient, verifyPayment)


module.exports = router