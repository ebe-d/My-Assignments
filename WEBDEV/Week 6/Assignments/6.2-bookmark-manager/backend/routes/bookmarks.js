const {Router}=require('express');
const router=Router();
const express=require('express');
const app=express();
const {AuthorisationMiddleware}=require('../middleware/user');
app.use(express.json());
const {Url}=require('../db/index');


router.post('/add',AuthorisationMiddleware,async(req,res)=>{
    const {url}=req.body;
    console.log(url)
    const Link=new Url({
        url
    });
    Link.save().then(()=>res.status(200).json({message:'Url Saved'}))
    .catch(err=>res.status(404).json({error:'Error Occured',err}))
});

router.delete('/delete',AuthorisationMiddleware,async(req,res)=>{
    const {url}=req.body;

    Url.findOneAndDelete({
        url:url
    }).then(()=>res.status(200).json({message:'Deleted'}))
    .catch(err=>{res.status(404).json('error occured')
        console.log(err);
    }
);
})

router.get('/bookmarks',AuthorisationMiddleware, async (req, res) => {
    try {
        const userId = req.user._id; 

        
        const bookmarks = await Url.find({ userId }).exec();

        res.status(200).json({ bookmarks }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch bookmarks' }); 
    }
});


module.exports=router;