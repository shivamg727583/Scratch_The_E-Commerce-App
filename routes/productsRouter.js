const express = require('express');
const router = express.Router();

const productsModel = require('../models/product-model');
const {CreateProduct} = require('../controller/productController');
const upload = require('../config/multer-config');

router.get('/',async (req,res)=>{
    let success = req.flash('success');
    let error = req.flash('error');

    const products = await productsModel.find();
    res.render('admin',{success,error,products})
})

router.post('/create',upload.single('image'),CreateProduct);

module.exports = router;
