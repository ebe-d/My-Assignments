import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/app/lib/db";



export async function POST(req:NextRequest){

    const data=await req.json();
    
    if(!data){
        throw new Error ('nothing here')
    }
    console.log(data.username);

    await prisma.user.create({
        data:{
            username:data.username,
            password:data.password
        }
    })
    
    return NextResponse.json({
        message:'Signed up'
    })
}