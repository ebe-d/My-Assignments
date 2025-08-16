import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const client=new PrismaClient();

export async function POST(req:NextRequest) {
    
    try{
    const {username,password,email}=await req.json();

    if(!username || !password || !email){
        return new NextResponse(JSON.stringify({
            error:'Missing Fields'
        }),{status:400})
    }

    const existingUser=await client.user.findFirst({
        where:{
            OR:[{username},{email}]
        }
    });

    if(existingUser){
        return new NextResponse(JSON.stringify({
            error:'User Already Exists'
        }),{status:400})
    }

    const hashPassword=await bcrypt.hash(password,10);

    await client.user.create({
        data:{
            username:username,
            password:hashPassword,
            email:email
        }
    });

    return new NextResponse(JSON.stringify({
        message:'User Created'
    }),{status:200});

}
catch(err){
    console.error(err);
    return new NextResponse(JSON.stringify({
        error:'Internal Server Error'
    }),{status:500})
}
}