 const express = require('express');
const router = express.Router();
const ownersModel = require('../models/owners-model');
const { isLoggedIn } = require('../middlewares/isloggedIn');

router.get('/',(req,res)=>{
   let error = req.flash("error");
   let success = req.flash("success");
    res.render("owner-login",{error:error,success:success,ownersLogged:true,isLogged:false})
})


if(process.env.NODE_ENV==="development"){
  
    router.post('/create',async (req,res)=>{
        
        try{
            const existingOwners = await ownersModel.find();
        
            if(existingOwners.length>0){
                req.flash("error","Owner already exists");
              return  res.redirect('/login');
            }

            let {fullname , email , password} = req.body;
            const owner = await ownersModel.create({
fullname,email,password
            })
            req.flash("success","Owner created successfully");
            res.redirect('/login');


        }catch(err){
            console.log("Error : ",err)   ;
            req.flash("error","Error creating owner");
       res.redirect('/login');
        }
    })
    
}

router.get('/admin',(req,res)=>{
    let success = req.flash('success');
    let error = req.flash('error');

    res.render('createproducts',{success,error,ownersLogged:true,isLogged:false})
})


module.exports = router;
