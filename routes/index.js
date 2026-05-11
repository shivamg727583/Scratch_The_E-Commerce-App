const express = require('express');
const router = express.Router();

const productModel=require('../models/product-model');
const usersModel = require('../models/user-model');
const {isLoggedIn} = require('../middlewares/isloggedIn');
const {groupCarts} = require('../utils/groupCarts');
const { cartCount} = require('../utils/cartCount');

router.get('/',(req,res)=>{
    let error = req.flash("error");
    let success = req.flash("success");
    res.render('index',{error:error,success:success,isLogged:false});

})



router.get('/shop',isLoggedIn,async (req,res)=>{
    const products=await productModel.find();
    let error = req.flash("error");
    let success = req.flash("success");
    const cartTotal = await cartCount(req.user);
    
    res.render('shop',{user:req.user,error:error,success:success,products,cartCount:cartTotal});
})

router.get('/addToCart/:id',isLoggedIn,async (req,res)=>{
    try{
        const user=await usersModel.findOne({email:req.user.email});
        user.cart.push(req.params.id);
        await user.save();
      
        req.flash("success","Added to cart");
        res.redirect('/shop')
    }catch
    (err){
        req.flash("error","Failed to add cart");
        res.redirect('/shop')
    }
   
})





// POST route to increment the quantity of a cart item
router.post('/increment/:id', isLoggedIn, async (req, res) => {
    try {
        const user = await usersModel.findOne({ email: req.user.email }).populate('cart');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartItem = user.cart.find(item => item._id.toString() === req.params.id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        cartItem.quantity += 1;
        user.cartCount += 1; // Increment cart count

        await user.save();

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the cart' });
    }
});

// POST route to decrement the quantity of a cart item
router.post('/decrement/:id', isLoggedIn, async (req, res) => {
    try {
        const user = await usersModel.findOne({ email: req.user.email }).populate('cart');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartItem = user.cart.find(item => item._id.toString() === req.params.id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        cartItem.quantity -= 1;
        user.cartCount -= 1; // Decrement cart count

        if (cartItem.quantity === 0) {
            user.cart = user.cart.filter(item => item._id.toString() !== req.params.id);
        }

        await user.save();

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the cart' });
    }
});


router.get('/cart',isLoggedIn,async (req,res)=>{
    // const user=await usersModel.findOne();
    const user=await req.user.populate('cart');
    let error = req.flash("error");
    let success = req.flash("success");
    const groupedCarts = groupCarts(user.cart);
    const cartCount = user.cart.length;

    console.log(groupedCarts)
    
    res.render('cart',{carts: groupedCarts ,error:error,success:success,cartCount});

    // res.render('cart',{user:req.user,error:error,success:success,products});
})

router.get('/logout',(req,res)=>{
    req.flash("success","You are logout");
    res.cookie("token","");
    res.redirect('/');
})

module.exports = router;
