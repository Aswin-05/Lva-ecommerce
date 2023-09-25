const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const { log } = require("console");

router.post("/payment", async (req, res) => {
    // console.log("apicall");

    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

    const order = await instance.orders.create({
        amount: Number(req.body.total * 100),
        currency: "INR",
        receipt: "receipt#1",
    });
    res.status(200).json({ success: true, order });
});

router.get("/get-key-id", (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/paymentverification", async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const exprectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = razorpay_signature === exprectedSignature

    if (isAuthentic) {
        // Save in the Database
        const payment = new Payment(req.body);
        const savedPayment = await payment.save();
        //send response
        res.status(200).json({ success: true,savedPayment });
    } else {
        res.status(400).json({ success: false });
    }
});

module.exports = router;
