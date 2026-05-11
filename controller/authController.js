const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const usersModel = require('../models/user-model');
const {generateToken} = require('../utils/generated-token');


module.exports.registerUser = async function (req,res){
    try { 
       const {fullname,email,password} = req.body;
  
    const user = await usersModel.findOne({email});
    if(user){
        req.flash("error","You alerady registered , PLease Login")
        return res.status(400).redirect("/");
        }
  
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err){
                    return res.status(500).send("Error generating password");
                    }
  
                    const newuser = await usersModel.create({
                        fullname,email,
                        password:hash
                    });
  
   let token =  generateToken(newuser);
     res.cookie("token",token);
  
                req.flash("success","User registered successfully");
                return res.status(201).redirect("/");
        })
        })
  
  
      
    } catch (error) {
      console.log(error.message);
      
    }
  
  
  }


  module.exports.loginUser = async function(req,res){
    try {
        const {email,password} = req.body;
        const user = await usersModel.findOne({email});
        if(!user){
            req.flash("error","Invalid Email or Password");
            return res.status(400).redirect("/");
            
            }
   bcrypt.compare(password , user.password ,(err,result)=>{
    if(err){
        req.flash("error","Invalid Email or Password");
        return res.status(400).redirect("/");
      
        }
        if(result){
            let token =  generateToken(user);
            res.cookie("token",token);
            req.flash("success","Logged in successfully");
            return res.status(200).redirect("/shop");
            
        }
   })

  }
  catch(err){
    console.log(err.message);

  }
}