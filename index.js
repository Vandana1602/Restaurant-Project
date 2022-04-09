const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const credential=require('./models/password');
mongoose.connect('mongodb://localhost:27017/resturant', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection successful");
}).catch((err)=>
{
    console.log("connect nhi hua beta",err);
});


app.set('view engine','ejs');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get('/',(req,res)=>
{
    res.render('home');
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/hash',async(req,res)=>
{
    const hash=await bcrypt.hash(text,12);
    res.send(hash);
})
app.get('/register',(req,res)=>
{
    res.render('register');
})

app.post('/register',async(req,res)=>
{
    const{username,password}=req.body;
    // const hash=await bcrypt.hash(password,10);
    const cred=new credential({username,password});
   await cred.save();
    res.redirect('/login')
})
app.post('/login',async(req,res)=>
{
    const{username,password}=req.body;
    console.dir(req.body)
    const user=await credential.findOne({username});
    console.log(user)
    const resu=await bcrypt.compare(password,user.password);
        if(resu)
           res.render('home');
        else
           res.redirect('/login');

})





app.listen(3000,function(){
    console.log("Running");
})