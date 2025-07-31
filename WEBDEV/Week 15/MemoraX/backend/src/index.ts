 import express from 'express'
import z, { optional } from 'zod'
import { UserModel } from './db/db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userMiddleware } from './middleware/middleware';
import { ContentModel,TypeModel,TagModel } from './db/db';
import cors from 'cors';


dotenv.config();

const JWT_SECRET:any=process.env.JWT_PASS;

const app=express();
 
app.use(express.json());
app.use(cors());

const ProfileSchema=z.object({
    username: z.string().min(3,{message:'Atleast 3 characters'})
    .max(13,{message:'Not more than 13 characters'}),

    password: z.string().min(3,{message:'Atleast 3 characters'})
    .max(14,{message:'Not more than 15 characters'})
    .regex(/[A-Z]/,{message:'One uppercase letter'})
    .regex(/[a-z]/,{message:'One lowercase letter'})
    .regex(/[0-9]/,{message:'One uppercase letter'})
    .regex(/^[A-Za-z0-9]/,{message:'One special character letter'})
})

app.post('/api/v1/signup',(req:express.Request,res:express.Response)=>{

    const HandleSignUp=async()=>{

        const ParsedData=ProfileSchema.safeParse(req.body);

        if(!ParsedData.success){
            return res.status(403).json({message:'Error In Inputs', error : ParsedData.error?.errors})
        }

        const {username,password}=ParsedData.data;

        const ExistUser = await UserModel.findOne({username});

        if (ExistUser){
            return res.status(403).json({message:'User already exists'})
        }

        const HashPassword=await bcrypt.hash(password,10);

        await UserModel.create({
            username:username,
            password:HashPassword
        });

        return res.status(200).json({
            message:'User Created Successfully'
        })
        
    }

    HandleSignUp().catch((error)=>{
        const ErrorMessage = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({message:'Error While Signing Up',error:ErrorMessage})
    })
});

app.post('/api/v1/signin',(req:express.Request,res:express.Response)=>{

    const SignInHandle = async()=>{

        const ParsedData=ProfileSchema.safeParse(req.body)

        if(!ParsedData.success){
            return res.status(402).json({message:'Error in inputs',error:ParsedData.error.errors })
        }

        const {username,password}=ParsedData.data

        const FindUser:any=await UserModel.findOne({
            username:username
        });

        if(!FindUser){
            return res.status(404).json({message:'User not found'})
        }

        const PassValid:any=bcrypt.compare(password,FindUser.password);

        if(!PassValid){
            return res.status(404).json({message:'Invalid Password'});
        }
        
        const token=jwt.sign({
            id:FindUser._id,
        },JWT_SECRET);
 
        return res.status(200).json({token})
    }

    SignInHandle().catch((error)=>{
        const ErrorMessage=error instanceof Error ? error.message : 'Unknown Error'
        return res.status(404).json({message:'Error While Signing In',error:ErrorMessage}) 
    })
});

app.post('/api/v1/content',userMiddleware,(req:express.Request,res:express.Response)=>{
 
    const ContentSchema=z.object({
        title:z.string().min(1,{message:'Title is required'}),
        link:z.string().url({message:'Link must be a valid url'}),
        type:z.string().min(3,{message:'Type is required (3 characters atleast)'}).optional(),
        tags:z.array(z.string()).min(1,{message:'Atleast one tag required'}).optional()
    });

    const Content = async ()=>{

        const parseData=ContentSchema.safeParse(req.body);

        if(!parseData.success){
            return res.status(400).json({message:'Validation failed',error:parseData.error.flatten()});
        }

        const TypeName=parseData.data.type;

        let SentType=await TypeModel.findOne({name:TypeName});

        if (!SentType){
            SentType=await TypeModel.create({name:TypeName});
        }

        const tagIds=[];
        const TagsRecv: string[] = parseData.data.tags ?? [];


        for ( const tagName of TagsRecv){
            if(!tagName) continue;
            let tag= await TagModel.findOne({ name : tagName });

            if (!tag){
                tag=await TagModel.create({ name : tagName });
            }
            tagIds.push(tag._id);
        }

       const {title,link}=parseData.data;

        // @ts-ignore
        const userId=req.userId;

        await ContentModel.create({
            title: title,
            link: link,
            type: SentType._id,
            tags: tagIds,
            userId: userId
        });

        return res.status(200).json({message:'Content added'})
    }

    Content().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error'
        res.status(500).json({message:'Error creating content',error:Errmessg})
    })
});


app.get('/api/v1/content',userMiddleware,(req:express.Request,res:express.Response)=>{

    const GetContent=async()=>{

        //@ts-ignore
        const UserID=req.userId
        const content=await ContentModel.find({
            userId:UserID
        }).populate('userId','username').populate('type','name');
        res.status(200).json({content})
    }
    GetContent().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({Errmessg})
    });
}
);

app.delete('/api/v1/content',userMiddleware,(req:express.Request,res:express.Response)=>{

    const {ContentId}=req.body;

    //@ts-ignore
    const UserID=req.userId;

    const DeleteContent= async ()=>{

        const Del=await ContentModel.deleteOne({
            _id:ContentId,
            userId:UserID
        });

        if(Del.deletedCount===0){
           return res.status(404).json({
                message:'Content not found / Not Authorized'
            });
        }

        return res.status(200).json({message:'Content deleted successfully'});

    }

    DeleteContent().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error deleting',error:Errmessg});
    })
});

app.get('/api/v1/brain/share',userMiddleware,(req:express.Request,res:express.Response)=>{

    //@ts-ignore
    const UserID=req.userId;

    const Brain = async ()=>{
         const User=await UserModel.findByIdAndUpdate(UserID,{share:true},{new:true});

         if(!User){
            return res.status(404).json({message:'User not found'});
         }

         const link=`http://localhost:3000/api/v1/brain/${UserID}`;

         return res.status(200).json({link:link});
    }

    Brain().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error Occured',error:Errmessg});
    })
});

app.get('/api/v1/brain/Disableshare',userMiddleware,(req:express.Request,res:express.Response)=>{

    //@ts-ignore
    const UserID=req.userId;

    const Brain = async ()=>{
         const User=await UserModel.findByIdAndUpdate(UserID,{share:false},{new:true});

         if(!User){
            return res.status(404).json({message:'User not found'});
         }

         return res.status(200).json({message:'Brain Sharing is disabled'});
    }

    Brain().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error Occured',error:Errmessg});
    });
});


app.get('/api/v1/content/:id/Disableshare',userMiddleware,(req:express.Request,res:express.Response)=>{

    const ContentShare = async ()=>{

        const ContentId=req.params.id;
        //@ts-ignore
        const UserID=req.userId;

        const content=await ContentModel.findOneAndUpdate(
            {_id:ContentId,userId:UserID},
            {share:false},
            {new:true}
        );

        if(!content){
            return res.status(404).json({message:'Content not found or not authorized'});
        }

        return res.status(200).json({message:'Content Sharing is disabled'})
    }

    ContentShare().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error Occured',error:Errmessg});
    })
});

app.get('/api/v1/content/:id/share',userMiddleware,(req:express.Request,res:express.Response)=>{

    const ContentShare = async ()=>{

        const ContentId=req.params.id;
        //@ts-ignore
        const UserID=req.userId;

        const content=await ContentModel.findOneAndUpdate(
            {_id:ContentId,userId:UserID},
            {share:true},
            {new:true}
        );

        if(!content){
            return res.status(404).json({message:'Content not found or not authorized'});
        }

        const link=`http://localhost:3000/api/v1/content/${ContentId}`;

        return res.status(200).json({link:link})
    }

    ContentShare().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error Occured',error:Errmessg});
    })
});

app.get('/api/v1/content/:id',(req:express.Request,res:express.Response)=>{

    const ContentId=req.params.id;
 
    const ShowShared = async()=>{

        const Content=await ContentModel.findById(ContentId);

        if(Content?.share===true){

            const StoreContent=await ContentModel.findById(ContentId);

            return res.status(200).json({StoreContent});
        }

        return res.status(404).json({message:'Content not shareable, Please ask the owner to authorize'})

    }

    ShowShared().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error Occured',error:Errmessg});
    });

});

app.get('/api/v1/brain/:id',(req:express.Request,res:express.Response)=>{
    
    const UserID=req.params.id;

    const ShowShared=async()=>{

        const Brain = await UserModel.findById(UserID);

        if(Brain?.share===true){
            
            const Display=await ContentModel.find({userId:UserID})

            return res.status(200).json({Display});
        }

        return res.status(404).json({message:'Content not shareable, Please ask the owner to authorize'})
    }

    ShowShared().catch((error)=>{
        const Errmessg=error instanceof Error ? error.message : 'Unknown Error';
        res.status(500).json({message:'Error Occured',error:Errmessg});
    });
});




app.listen(3000,()=>{
    console.log('Running on Port');
})
