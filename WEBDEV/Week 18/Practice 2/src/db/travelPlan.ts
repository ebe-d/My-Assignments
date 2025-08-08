import { PrismaClient, type TravelPlan } from "@prisma/client";

const client = new PrismaClient();

interface travelPlan {
    id:number
    title: string,
    destination_city: string,
    destination_country: string,
    start_date: string,
    end_date: string,
    budget: number,
    userId: number
}

export async function createTravelPlan(userId: number, travelPlan: travelPlan): Promise<TravelPlan> {
    const response = await client.travelPlan.create({
        data: {
            userId: userId,
            title: travelPlan.title,
            destinationCity: travelPlan.destination_city,
            destinationCountry: travelPlan.destination_country,
            start_date: new Date(travelPlan.start_date),
            end_date: new Date(travelPlan.end_date),
            budget: Number(travelPlan.budget)
        },
        select: {
            id: true,
            userId: true,
            title: true,
            destinationCity: true,
            destinationCountry: true,
            start_date: true,
            end_date: true,
            budget: true
        }
    });
    return response;
}

export async function updateTravelPlan(planId:number,title?:string,budget?:Number):Promise<TravelPlan>{

    const data:any={};

    if(title!==undefined)data.title=title;
    if(budget!==undefined)data.budget=budget;
    let res:TravelPlan;
    const response=client.travelPlan.update({
        data:data,
        where:{
            id:planId
        },
         select:{
            userId:true,
            id:true,
            title:true,
            destinationCity:true,
            destinationCountry:true,
            start_date:true,
            end_date:true,
            budget:true
        }
    })
    return response;
}

export async function getTravelPlans(userId:number):Promise<TravelPlan[]> {
    const response=await client.travelPlan.findMany({
        where:{
            userId:userId
        }
    });
    if(!response){
        throw new Error("no user found");
    }
    return response;
}

module.exports={getTravelPlans,createTravelPlan,updateTravelPlan}