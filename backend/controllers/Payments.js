const { instance } = require("../config/razorpay")
// const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/userModel")


exports.capturePayment = async (req, res) => {

//   const userId = req.user.id
  let total_amount = 10
try {
    const cost=50000
    const amount = cost; // Amount in paise
    const currency = 'INR';
    const receipt = 'receipt_' + crypto.randomBytes(5).toString('hex'); 
    const order = await instance.orders.create({amount, currency, receipt});
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature


  const userId = req.userId;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    console.log("Payment Verified")
    // find user by and then update the subscription tier
    // await User.findByIdAndUpdate

    const subscription= await User.findByIdAndUpdate(
      userId,
      {
        subscriptionTier: "bronze",
      },
      { new: true }

    )
    console.log(subscription);


    return res.status(200).json({ success: true, message: "Payment Verified", subscription })

  }


  return res.status(200).json({ success: false, message: "Payment Failed" })
}
