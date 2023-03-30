const Product=require("../Model/product")
const mongodb=require("mongodb")

const getAddProduct=(req,res)=>{
    //res.sendFile(path.join(dirpath,"./","Views","add-Product.html"));

     res.render('admin/edit-Product',{docTitle:"add-Product",path:"/admin/add-product",editing:false})
}

const addProducts=(req,res)=>{
        const title=req.body.title;
        const imageUrl=req.body.imageUrl;
        const price=req.body.price;
        const description=req.body.description;
        const product=new Product(title,price,imageUrl,description);
        product.save()
        .then(result=>{
            console.log("Product added");
            res.redirect("/products")
        })
        .catch(err=>console.log(err));
        /*req.user.createProduct({
            title:title,
            imageUrl:imageUrl,
            price:price,
            description:description,
        }).then(result=>{
            console.log("Result added");
            res.redirect("/products")
        }).catch(err=>console.log(err));*/
}


const getProductList=async(req,res)=>{
    //res.sendFile(path.join(dirpath,"./","Views","Product.html"));
    /*const productList=await products.findAll();
    res.render('admin/Products',{prod:productList,docTitle:"Admin Product Page",path:"/admin/products"})*/
    Product.fetchAll()
    .then(productList=>{
        res.render('admin/Products',{prod:productList,docTitle:"Product Page",path:"/admin/products"})
    })
    .catch(err=>console.log(err));
}

const getEditProduct=async(req,res)=>{
    const productId=req.params.productId;

    Product.fetchById(productId)
    .then(product=>{
        res.render('admin/edit-Product',{docTitle:"Edit Product Page",path:"/admin/edit-Product",editing:true,product:product})
    })
    /*const product=await products.findByPk(productId);

    res.render('admin/edit-Product',{docTitle:"Edit Product Page",path:"/admin/edit-Product",editing:true,product:product});*/
    
}

const deleteProduct=(req,res)=>{
    
    /*products.destroy({
        where:{
            id:req.body.productId
        }
    })
    res.redirect('/admin/products')*/
    const prodId=req.body.productId
    Product.deleteById(prodId)
    .then(res.redirect('/admin/products'))
    .catch(err=>console.log(err));
}

const postEditProduct=async(req,res)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    const _id=req.params.productId;
        const product=new Product(title,price,imageUrl,description,_id);
        product.save()
        .then(result=>{
            console.log("Product edited");
            res.redirect("/admin/products")
        })
        .catch(err=>console.log(err));
}
  /*products.update({
    title:req.body.title,
    imageUrl:req.body.imageUrl,
    price:req.body.price,
    description:req.body.description},{where:{
        id:prodId
    }})

  
    products.findByPk(prodId).then(product=>{
    product.title=req.body.title;
    product.imageUrl=req.body.imageUrl;
    product.price=req.body.price;
    product.description=req.body.description;
    return product.save();
  })
  res.redirect('/admin/products');
}*/

module.exports={
    getAddProduct,
    addProducts,
    getProductList,
    getEditProduct,
    postEditProduct,
    deleteProduct
}