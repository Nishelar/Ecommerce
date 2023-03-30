const { where } = require("sequelize");
const { addProduct } = require("../Model/cart")

const Product=require("../Model/product")
const User=require("../Model/user");
const { getDatabase } = require("../utils/db");

const getProductList=(req,res)=>{
    //res.sendFile(path.join(dirpath,"./","Views","Product.html"));
    /*const productList=await Product.findAll();*/
    Product.fetchAll()
    .then(productList=>{
        res.render('shop/ProductList',{prod:productList,docTitle:"Product Page",path:"/products"})
    })
    .catch(err=>console.log(err));
}

const getProduct=(req,res)=>{
    //res.sendFile(path.join(dirpath,"./","Views","Product.html"));
    
    const productId=req.params.productId;
    Product.fetchById(productId)
    .then(product=>{
        res.render('shop/ProductDetail',{prod:product,docTitle:"Product Page",path:"/products"})
    })
    .catch(err=>console.log(err));
    /*const product=await Product.findByPk(productId)
    res.render('shop/ProductDetail',{prod:product,docTitle:"Product Page",path:"/products"})*/ 
}

/*const getIndex=async(req,res)=>{
    //res.sendFile(path.join(dirpath,"./","Views","Product.html"));
    const productList=await Product.findAll();
    res.render('shop/index',{prod:productList,docTitle:"Product Page",path:"/"})
}
*/
const getCart=(req,res)=>{

    req.user.getCart().then(products=>{
        res.render('shop/cart',{path:"/cart",docTitle:"Cart Page",products:products});
    })
    /*req.user.getCart()
    .then(result=>{
        return result;
    })
    .catch(err=>console.log(err))
    .then(cart=>{
        return cart.getProducts()
    })
    .catch(err=>console.log(err))
    .then(products=>{
        console.log(products);
        res.render('shop/cart',{path:"/cart",docTitle:"Cart Page",products:products})
    })
    .catch(err=>console.log(err))*/
}

const addCart=(req,res)=>{
    const prodId=req.body.productId;
    Product.fetchById(prodId)
    .then(product=>{
        return req.user.addProductToCart(product);
    })
    .then(result=>{
        res.redirect("/cart");
    })

    /*let userCart;
    req.user.getCart().
    then(cart=>{
       userCart=cart;
       return cart.getProducts({
        where:{
            id:prodId,
        }
       })
    }).
    catch(err=>console.log(err))
    .then(products=>{
        if(products.length>0){
          const prod=products[0];
          const acqaunt=prod.cartItem.quantity;
          const newquantity=acqaunt+1;
          return Product.findByPk(prodId).then(
            product=>{
                return userCart.addProduct(product,{through:{quantity:newquantity}});
            }
          ).catch(err=>console.log(err));
        }
        else{
           return Product.findByPk(prodId).then(
            product=>{
                userCart.addProduct(product,{through:{quantity:1}})
            }
           )
        }
    })
    .then(
        res.redirect("/cart")
    )*/
}


const deleteCartItems=(req,res)=>{
    const prodId=req.body.productId;
    req.user.deleteCart(prodId).then(
        result=>{
        res.redirect('/cart')
        }
    )
    /*req.user.getCart().then(cart=>
        {
            return cart.getProducts({
                where:{
                    id:prodId
                }
            })
        })
    .then(products=>{
        const prod=products[0];
        return prod.cartItem.destroy();
    })
    .then(result=>
        res.redirect('/cart')
    )*/

}

const createOrder=(req,res)=>{

    req.user.addToOrder()
    .then(result=>{
        console.log("Order place successfully");
        res.redirect('/orders'); 
    })
    /*let fetchedCart;
    req.user.getCart().then(cart=>{
        fetchedCart=cart
        return cart.getProducts();
    })
    .then(products=>{
        return req.user.createOrder().
        then(order=>{
            return order.addProducts(products.map(product=>{
                product.orderItems={quantity:product.cartItem.quantity}
                return product;
            }))
            })    
    })
    .then(result=>{
        return fetchedCart.setProducts(null);
    })
    .then(result=>{
        res.redirect('/orders');
    })*/
}
const getCheckout=(req,res)=>{
    res.render('shop/checkout',{path:"/checkout",docTitle:"CheckOut Page"});
}

const getOrders=(req,res)=>{
    //req.user.getOrders({include:['products']})
    req.user.getOrders()
    .then(orders=>{
        res.render('shop/order',{path:"/orders",docTitle:"Order Page",orders:orders});
    })
}
module.exports={
    getProductList,
    //getIndex,

    getCart,
    //getCheckout,
    getOrders,
    getProduct,
    addCart,
    deleteCartItems,
    createOrder
}