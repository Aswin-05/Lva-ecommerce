const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");



// Create Cart
router.post("/",verifyToken,async(req,res)=>{
  const newCart = new Cart(req.body)

  try{
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  }catch(err){
    res.status(500).json(err)
  }
})


// Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart is Deleted");
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get User Cart
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All 
router.get("/", verifyTokenAndAdmin,async(req,res)=>{
  try{

    const allCarts = await Cart.find()

    res.status(200).json(allcarts)
  }catch(err){
    res.status(500).json(err)
  }
})



module.exports = router;
