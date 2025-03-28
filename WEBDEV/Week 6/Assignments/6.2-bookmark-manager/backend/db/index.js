const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://ebenezerdsouza:passwrd@cluster0.9onbj.mongodb.net/');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:false
    }
});

const UrlSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
});

const User=mongoose.model('user',userSchema);

const Url=mongoose.model('url',UrlSchema);

module.exports={
    User,
    Url
}