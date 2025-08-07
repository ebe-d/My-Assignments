import express from 'express';

import {Client} from "pg";

const app = express();
app.use(express.json());

const pgClient=new Client({
    user:"neondb_owner",
    password:"npg_pO67XLTfsZvb",
    host:"ep-old-lab-a12hb9m0-pooler.ap-southeast-1.aws.neon.tech",
    database:"neondb",
    port:5432,
    ssl:{
        rejectUnauthorized:false
    }
});

pgClient.connect();

app.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    const city=req.body.city;
    const street=req.body.street;
    const country=req.body.country;
    const pincode=req.body.pincode;

    try{
        
        const query='INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id;'
        const addQuery='INSERT INTO addresses (user_id,city,country,street,pincode) VALUES ($1,$2,$3,$4,$5);'

       await pgClient.query('BEGIN;')
    const response=await pgClient.query(query,[username,email,password]);
    const userId=response.rows[0].id;
    const response2=await pgClient.query(addQuery,[userId,city,country,street,pincode])
        await pgClient.query('COMMIT;')
    res.json({
        message:"Signed up"
    })
    }
    catch(e){
        await pgClient.query('ROLLBACK;')
        console.log(e);
        res.json({message:'eeror'})
    }
    
})

app.get('/metadata',async(req,res)=>{
    const userId=req.query.id;
    const query='SELECT u.username,u.email,a.city,a.country,a.street FROM users u JOIN addresses a ON u.id=a.user_id WHERE u.id=$1';
    const response=await pgClient.query(query,[userId]);
    console.log(response.rows[0]);
    const resu=response.rows[0];
    res.json({
        resu
    });
})


app.listen(3000,()=>{
    console.log("runnning");
    
})
