/*const Sequelize=require("sequelize")

const sequelize=require("../utils/db")

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})


module.exports=User;*/

const {getDatabase}=require("../utils/db")
const mongodb=require("mongodb");
const {ObjectId}=mongodb

class User{
    constructor(name,email,cart,_id){
        this.name=name;
        this.email=email;
        this.cart=cart;
        this._id=_id;
    }
    save(){
        const db=getDatabase();
        return db.collection('users').insertOne(this)
        .then(result=>{
            console.log(result);
            return result;
        })
        .catch(err=>console.log(err));
    }

    static findById(prodId){
        const db=getDatabase()
        return db.collection('users').findOne({_id:new mongodb.ObjectId(prodId)})
        .then(result=>{
            console.log(result);
            return result;
        })
        .catch(err=>console.log(err));
    }

    addProductToCart(product){
        const cartitems=this.cart.items;
        const prod=cartitems.findIndex(item=>item.productId.toString()===product._id.toString());
        let updatedCart={items:[...cartitems]};
        const db=getDatabase()
        if(prod>=0){
            const newquantity=cartitems[prod].quantity+1;
            cartitems[prod].quantity=newquantity;
            updatedCart={items:[...cartitems]};
        }
        else{
            updatedCart.items.push({productId:new ObjectId(product._id),quantity:1});
        }
        console.log(updatedCart);
        return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}});
    }

    getCart(){
        const db=getDatabase();
        const productIDs=this.cart.items.map(item=>{
        return item.productId
    })
    return db.collection('products').find({_id:{$in:productIDs}}).toArray().
    then(products=>{
        return products.map(product=>{
            return {...product,quantity:this.cart.items.find(i=>{
                return i.productId.toString()===product._id.toString();
            }).quantity}
        })
    })
   }

   deleteCart(productId){
       const updatedCart=this.cart.items.filter(item=>{
        return item.productId.toString()!=productId.toString();
       });
       const db=getDatabase();
       return db.collection("users").updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:{items:updatedCart}}});
   }

   addToOrder(){
       const db=getDatabase();
       return this.getCart().then(products=>{
           const orders={
               items:products,
               user:{
                _id:this._id,
                name:this.name,
               }
           };
           return orders
       })
       .then(
         orders=>{
             return db.collection('orders').insertOne(orders)
             .then(result=>{
                this.cart=[];
                return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:{items:[]}}})
             })
         }
       )
   }

   getOrders(){
      const db=getDatabase();
      return db.collection('orders').find({'user._id':new mongodb.ObjectId(this._id)})
      .toArray()
      .then(result=>{
        console.log(result);
        return result
      })
   }
    /*req.
    }
}*/
}

module.exports=User