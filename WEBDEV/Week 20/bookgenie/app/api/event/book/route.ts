import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const client=new PrismaClient();

export async function POST(req:NextRequest) {
        const {userId,EventId}=await req.json();

        try{
            const checkBooked=await client.event.findFirst({
                where:{
                    id:EventId
                },
                include:{
                    bookedStatus:true
                }
            });

            if(!checkBooked){
                return NextResponse.json({
                    error:'Event not found'
                },{status:403})
            }
        
            if(checkBooked.bookedStatus){
                return NextResponse.json({
                    error:'Event already booked'
                },{status:403})
            }

            const res=await client.bookedEvents.create({
                data:{
                    EventId:EventId,
                    userId:userId,
                    status:'CONFIRMED'
                }
            });

            return NextResponse.json({
                success:true,res
            },{status:201})
        }
        catch(err){
            return NextResponse.json({
                error:'Something went wrong',err
            },{status:500})
        }
}   