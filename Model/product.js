/*const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});*/

const {getDatabase}=require("../utils/db")
const mongodb=require("mongodb")
class Product{
  constructor(title,price,imageUrl,description,id){
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
    this._id=id ? new mongodb.ObjectId(id):null;
  }

  save(){
    const db=getDatabase();
    let dbop;
    if(this._id){
        dbop=db.collection('products').updateOne({_id:this._id},{$set:this})
    }
    else{
        dbop=db.collection('products').insertOne(this);
    }
    return dbop.then(result=>{
      console.log(result);
      return result;
    })
    .catch(err=>
      console.log(err)
    );
  }

  static fetchAll(){
    const db=getDatabase();
    return db.collection('products').find().toArray()
    .then(products=>{
      return products;
    })
    .catch(err=>console.log(err));
  }

  static fetchById(prodId){
    const db=getDatabase();
    return db.collection('products').find({_id:new mongodb.ObjectId(prodId)})
    .next().then(product=>{
      return product}
      ).catch(err=>console.log(error));
  }

  static deleteById(prodId){
    const db=getDatabase();
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
    .then(result=>{
      console.log(result);
      return result;
    }).catch(err=>console.log(error));
  }

}

module.exports = Product;