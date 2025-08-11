
// const prisma=globalThis.prisma??new PrismaClient();

import { PrismaClient } from "@prisma/client"


// if(process.env.NODE_ENV!=='production')globalThis.prisma=prisma;

// export default prisma;


const SingletonPrisma = ()=>{
    return new PrismaClient();
}

type SingletonPrisma=ReturnType<typeof SingletonPrisma>

const GlobalforPrisma=globalThis as unknown as {
    prisma:SingletonPrisma|undefined;
}

const prisma=GlobalforPrisma.prisma??SingletonPrisma();



if(process.env.NODE_ENV!=='production') GlobalforPrisma.prisma=prisma;

export default prisma;