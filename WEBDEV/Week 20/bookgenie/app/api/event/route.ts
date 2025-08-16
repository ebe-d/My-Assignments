import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client=new PrismaClient();

export async function GET(req:NextRequest) {
        const res=await client.event.findMany();

        return NextResponse.json({
            success:true,
            res
        },{status:200});
}

export async function DELETE(req:NextRequest) {

    const {id,userId}=await req.json();

    try{
         const res=await client.event.findUnique({
            where:{
            id:id
        }
    });

    if(!res){
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if(res.createdById!==userId){
         return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    await client.event.delete({where:{
        id:id
    }});

    return NextResponse.json({
        success:true,message:'Event deleted'
    },{status:200})
    }
   catch(err)
   {

    NextResponse.json({
        error:'Error occured',err
    })
   }


}

export async function PUT(req:NextRequest) {
    const {id,userId,Fields}=await req.json();

    try{
         const event = await client.event.findUnique({ where: { id } });
            if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }
            if (event.createdById !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
            }
            const res=await client.event.update({
            where:{
                id:id
            },
            data:Fields
        });

        return NextResponse.json({
            success:true,
            message:'Updated',res
        })
    }
    catch(err){
        return NextResponse.json({
            error:'Error occured',
            err
        })
    }
}