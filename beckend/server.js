const express=require('express');
const cors =require('cors');
const mongoose =require('mongoose');
const userRouter= require ('./routes/users');
const signinRouter= require ('./routes/signin');
const protected= require ('./routes/protected');



require('dotenv').config();

const app =express();
const port =process.env.PORT ||5000;

app.use(cors());
app.use(express.json());


const uri= process.env.LOCAL_URI;
console.log(uri)
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true});

const connection=mongoose.connection;
connection.once('open',()=>{
console.log('mongoDB connection ok')
})


app.use('/users',userRouter);
app.use('/api',signinRouter);
app.use('/api/protected',protected);



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
