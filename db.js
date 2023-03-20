const mongoose =require('mongoose')


const mongoURI = "mongodb://localhost:27017"

mongoose.connect(mongoURI,()=>{
    console.log("Connected to Mongo Successfully")});
