import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();

interface User {
    id:number
    username: string,
    password:string
    email:string
}

export const createUser = async(User:Omit<User,'id'>):Promise<User>=>{
    const response=await client.user.create({
        data:{
            username:User.username,
            password:User.password,
            email:User.email
        },
        select:{
            id:true,
            username:true,
            password:true,
            email:true
        }
    });
    return response;
}

export async function getUser(userId:number):Promise<Omit<User,'id'>> {
    const response=await client.user.findFirst({
        where:{
            id:userId
        },
        select:{
            username:true,
            password:true,
            email:true
        }
    });
    if(!response){
        throw new Error('user not found');
    }
    return response;
}

module.exports={getUser,createUser}