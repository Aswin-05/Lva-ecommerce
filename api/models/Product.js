const mongoose= require("mongoose")

const productSchema = new mongoose.Schema(
  {
    title:{type: String, required:true, unique:true},
    desc :{ type:String ,required: true},
    img: {type:String,require:true},
    category: {type:String},
    size: {type:Array},
    flavour: {type:Array},
    price: {type:Number, requred:true},
    inStock:{type:Boolean, default:true}

  },{timestamps:true}
)

module.exports = mongoose.model("Product",productSchema)
