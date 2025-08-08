import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function dropTables():Promise<null>{
    await prisma.travelPlan.deleteMany({});
    await prisma.user.deleteMany({});
     console.log("deleted");
    return null;
}

module.exports={dropTables}