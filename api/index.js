require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoute = require("./routes/users")
const authRoute = require('./routes/auth')
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
// const stripeRoute = require("./routes/stripe")
const razorpayRoute = require("./routes/razorpay")
const Port = process.env.PORT || 5000

const app =express();

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Database is Connected"))
.catch((err)=>{
  console.log(err);
})

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: false }));
// app.use("/", userRoute)
// app.use("/auth", authRoute)
// app.use("/product",productRoute)
// app.use("/cart",cartRoute)
// app.use("/order",orderRoute)
// app.use("/stripe",stripeRoute)

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", razorpayRoute);

app.listen(Port,()=>{
  console.log(`Backend Server is running on port ${Port}`)
})