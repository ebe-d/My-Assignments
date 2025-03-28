
const {Router}=require('express')
const router=Router();
const {CheckAuthMiddleware}=require('../middleware/user')
const {Todo}=require('../db/index');

let counter=0;
router.post('/addTodo',CheckAuthMiddleware,(req,res)=>{
    const {Name,status}=req.body;

    const todo=new Todo({
    Name:Name,
    status:status||'ongoing',
    id:counter
    });

    todo.save()
    .then(()=>res.status(200).json({message:'Todo Saved',todo}),counter+=1)
    .catch(err=>res.status(400).json({error:'Oops Error Occured',details:err}))
});

router.put('/updateTodo',CheckAuthMiddleware,(req,res)=>{
    const {Name,status}=req.body;

    Todo.findOneAndUpdate(
        {Name:Name},
        {status:status},
        {new:true}
    ).then(UpdatedTodo=>{
        if(!UpdatedTodo){
            return res.status(400).json({message:"Todo Not Found"})
        }
        res.status(200).json({message:"Todo Updated",UpdatedTodo});
    }).catch(err=>res.status(404).json({error:'Failed to update',details:err.message}));
})

router.get('/DisplayAll', CheckAuthMiddleware, (req, res) => {
    Todo.find()
    .then(todos=>res.status(200).json(todos))
    .catch(err=>res.status(500).json({error:'failed',details:err}))
});

router.delete('/delete', CheckAuthMiddleware, (req, res) => {
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


module.exports=router;