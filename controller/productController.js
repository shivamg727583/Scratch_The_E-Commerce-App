const productsModel = require('../models/product-model');



module.exports.CreateProduct = async (req,res)=>{
    const {  image, name,  price, discount,  bgcolor,  panelcolor,  textcolor} = req.body;

    try{
       const product = await productsModel.create({
        image:req.file.buffer,
         name,  price, discount,  bgcolor,  panelcolor,  textcolor
        });

       req.flash("success","Product created successfully");
       res.redirect('/owners/admin');
    }catch(err){
        console.log(err);
        req.flash("error","Product creation failed");
        res.redirect('/products/create');
    }

}