const express = require('express');
const router = express.Router();
const {registerUser} = require('../controller/authController');
const {loginUser} = require('../controller/authController');
const { isLoggedIn } = require('../middlewares/isloggedIn');



router.get('/profile',isLoggedIn,(req,res)=>{
    res.render("users-profile",{user:req.user})
})

router.post('/register',registerUser);

router.get('/login',(req,res)=>{
    res.redirect('/');
});
router.post('/login',loginUser);


module.exports = router;
