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

    const query='INSERT INTO users (username,email,password) VALUES ($1,$2,$3)'
    const response=await pgClient.query(query,[username,password,email]);
    
    res.json({
        message:"Signed up"
    })
})

app.listen(3000,()=>{
    console.log("runnning");
    
})
