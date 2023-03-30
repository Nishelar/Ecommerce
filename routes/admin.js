const express=require("express");
const router=express.Router();
const path=require("path");
const dirpath=require("../utils/index")
const {addProducts,getAddProduct, getProductList, getEditProduct, postEditProduct,deleteProduct}=require("../Controller/admin")

router.get("/add-product",getAddProduct)


router.get("/edit-product/:productId",getEditProduct)

router.post("/edit-product/:productId",postEditProduct)

router.get('/products',getProductList)

router.post('/delete-product',deleteProduct);

router.post("/add-product",addProducts)

module.exports={
    adminRoute:router,
}