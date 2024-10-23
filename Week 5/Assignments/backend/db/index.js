const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://ebenezerdsouza:hI6GSAnO9OuGDUU3@cluster0.9onbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const TodoSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    status:{
        type:String,
        enum:['ongoing','completed'],
        default:'ongoing'
    },
    id:{
        type:Number
    }
});

const User=mongoose.model('User',UserSchema)
const Todo=mongoose.model('todo',TodoSchema)

module.exports={
    User,
    Todo
}