const mongoose= require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    fName:{type: String, required:true},
    lName:{type: String, required:true},
    phone:{type: Number, required:true},
    products :{type:Array},
    amount:{type:Number,require:true},
    address:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true},
    pincode:{type:Number, required:true},
    status:{type:String, default:"Placed"}

  },{timestamps:true}
)

module.exports = mongoose.model("Order",orderSchema)
