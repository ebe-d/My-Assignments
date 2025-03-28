const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();
const {Todo}=require('../database/index')
const {User}=require('../database/index')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')


router.post('/register',async(req,res)=>{
    const {username,password}=req.body;

    const hashedpass= await bcrypt.hash(password,10)

    const user=new User({
        name:username,
        password:hashedpass
    });
    try {
        await user.save();
        res.status(201).json({message:'user registered'})
    }
    catch(error){
        res.status(500).json({error:'registartion failed'})
    }
})

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;

    const user=await User.findOne({name:username})
    if(!user){
        return res.status(400).json({
            message:{username},
            error:'Invalid username'})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({error:'Invalid Password'})
    }
    const token=jwt.sign({id:user._id},'2004',{expiresIn:'1h'});
    res.status(200).json({token});
})



router.post('/', adminMiddleware,(req, res) => {
    const { Name, status ,id} = req.body;

    const todo = new Todo({
        Name: Name,
        status: status || 'pending' ,
        id: id
    });

    todo.save()
        .then(() => res.status(201).json({ message: 'Todo created', todo }))
        .catch(err => res.status(500).json({ error: 'Failed to create todo', details: err }));
});

router.put('/', adminMiddleware, (req, res) => {
    const { id , status} = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Name field is required to update the todo.' });
    }


    Todo.findOneAndUpdate(
        { id: id },
        { status: status || 'pending' }, 
        { new: true } 
    )
    .then(updatedTodo => {
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo updated', updatedTodo });
    })
    .catch(err => res.status(500).json({ error: 'Failed to update todo', details: err.message }));
});

router.delete('/', adminMiddleware, (req, res) => {
    const {Name} = req.body;
    if (!Name){
        return res.status(401).json({message:'Name Field Empty'})
    }

    Todo.findOneAndDelete(
        {Name:Name},
    )
    .then(newtodo=>{
        if(!newtodo){
            return res.status(404).json({message:'todo not found'})
        }
        res.status(200).json({message:'todo deleted'})
    })
    .catch(err=> res.status(500).json({message:'error occured',details:err.message}))
});

router.delete('/:id', adminMiddleware, (req, res) => {
    const {id}=req.params;
    if (!id){
        return res.status(401).json({message:'Name Field Empty'})
    }
    Todo.findByIdAndDelete(id)
    .then(newtodo=>{
        if(!newtodo){
            return res.status(404).json({message:'todo not found'})
        }
        res.status(200).json({message:'todo deleted'})
    })
    .catch(err=> res.status(500).json({message:'error occured',details:err.message}))
});


router.get('/', adminMiddleware, (req, res) => {
    Todo.find()
    .then(todos=>res.status(200).json(todos))
    .catch(err=>res.status(500).json({error:'failed',details:err}))
});

router.get('/:id', adminMiddleware, (req, res) => {
    const {id}=req.params;
    Todo.findById(id)
    .then(todos=>res.status(200).json(todos))
    .catch(err=>res.status(500).json({error:'failed',details:err}))
});


module.exports = router;