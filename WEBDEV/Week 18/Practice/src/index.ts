import {PrismaClient} from "@prisma/client";

const client=new PrismaClient();

async function createUser() {
    await client.user.create({
    data:{
        username:"ebe",
        password:"rfefds",
        age:21,
        city:"dffsfds"
    }
})
}

createUser();