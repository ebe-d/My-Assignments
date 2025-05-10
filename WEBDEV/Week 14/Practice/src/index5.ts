import {z} from 'zod';

import express from 'express';

const App = express();

const UserSchema=z.object({
    name:z.string().min(1,{message:'Need one'}),
    email:z.string().email({message:'hello'}),
    age:z.number().min(18,{message:'should be above 18'}).optional()
});

App.put('/user',(req,res)=>{
    const Parsedata=UserSchema.safeParse(req.body);

     if(!Parsedata.success){
        res.status(500).json({});
        return
    }

    type TypeIO=z.infer<typeof UserSchema>

    const updatedBody:TypeIO=Parsedata.data;
    
    res.json({
        updatedBody,
        message:"user updated"
    })
});


App.listen(3000);

