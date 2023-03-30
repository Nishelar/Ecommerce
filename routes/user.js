const express=require("express")
const router=express.Router()
const {getProductList,getIndex, getCart, getCheckout, getOrders,getProduct,addCart,deleteCartItems,createOrder}=require("../Controller/shop")

//router.get("/",getIndex)

router.get("/products",getProductList);


router.get("/product/:productId",getProduct);
router.get("/cart",getCart);

router.post("/cart",addCart);

router.post("/cart-delete-item",deleteCartItems);

router.post("/create-order",createOrder);
router.get("/orders",getOrders);

//router.get("/checkout",getCheckout);

router.get("/orders",getOrders);

module.exports=router;