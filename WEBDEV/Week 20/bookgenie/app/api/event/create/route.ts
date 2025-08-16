import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client=new PrismaClient();

export async function POST(req:NextRequest) {
    const {title,description,date,location,createdBy}=await req.json();

    try{
            const res=await client.event.create({
        data:{
            title,description,date:new Date(date),location,createdBy
        }
    });
        return NextResponse.json({success:true,res})
    }
    catch(err){
        return NextResponse.json({
            error:'Internal server error'+err
        },{status:500})
    }

}