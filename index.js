const cookieParser = require('cookie-parser');
const path = require("path");//required to create paths
const express= require('express');
const sessions=require('express-session');


const app=express();
const PORT=process.env.PORT;

//set cookie length
const oneDay= 1000*60*60*24;
//set session features for incoming request to server

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(sessions({
    secret: "thisismysecrctekey",
saveUninitialized:true,
cookie: { maxAge: oneDay },
resave: false

}))
app.set("view engine","ejs");//set engine
app.set("views",path.join(__dirname,"views"));//set directory path for render to access view engine


app.get('/login',(req,res)=>{
 
//res.send("session created")
res.render("login");


});

app.post('/login',(req,res)=>{
    req.session.user=req.body.user;
req.session.pwd=req.body.pwd;
console.log(req.session);
res.send("session and user  created")

})

app.get('/welcome',(req,res)=>{
    if(req.session.user)
    {
        res.render("welcome",{user:req.session.user});
    }
    else
    res.send("No login");


});

app.get('/get',function(req, res){
    res.send(req.session.user);
    });

app.listen(PORT,()=>{
    console.log("listening at "+PORT)
})