const mongoose= require("mongoose")

const cartSchema = new mongoose.Schema(
  {
    userId:{type: String, required:true},
    products :[
      {
        productId:String,
        quantity:{type:Number,default:1},
        flavour:{type:String},
        size:{type:String}
      }
    ]

  },{timestamps:true}
)

module.exports = mongoose.model("Cart",cartSchema)