const express=require("express")

const bodyParser=require("body-parser");
const {adminRoute}=require("./routes/admin")
const userRoute=require("./routes/user")

const app=express();

const sequelize=require("./utils/db");

const Product=require("./Model/product");
const User=require("./Model/user");
const Cart=require("./Model/cart");
const CartItem=require("./Model/cartItem");
const Order=require("./Model/order");
const OrderItem=require("./Model/orderitem");

const {mongoDBconnection,getDatabase}=require("./utils/db")


/*Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order,{through:OrderItem})
Order.belongsToMany(Product,{through:OrderItem})*/
app.set('view engine','ejs');
app.set('views','Views')

const path=require("path");
const dirpath=require("./utils/index")
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next)=>{

    User.findById("64251e24c7bc5644fb32042e").then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id);
        next();
    }).catch(err=>console.log(err))
})

/*sequelize.sync()
.then(result=>{
    return User.findByPk(1);
}
)
.then(user=>{
    if(!user){
        return User.create({name:'james',email:'test@test.com'});
    }
    return user; 
})
.then(result=>{
    let tempuser=result;
    return result.getCart().then(
        result=>{
            if(result){
                return result;
            }
            else{
                return tempuser.createCart();
            }
        }
    )
})
.then(result=>{
    app.listen(3001);
}).catch(err=>{
    console.log(err);
})
*/

app.use("/admin",adminRoute);

app.use(userRoute);

/*app.use((req,res)=>{
    //res.sendFile(path.join(dirpath,"Views","404.html"));
    res.status(404).render("404",{docTitle:"Error Page"});
})*/

mongoDBconnection(()=>{
    app.listen(3001)
})

