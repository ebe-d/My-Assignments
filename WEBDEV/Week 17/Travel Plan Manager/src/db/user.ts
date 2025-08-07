import { pg } from "../index.js"

interface User {
    id?:number
    name:string,
    password:string,
    email:string
    created_at?:string
}



export const createUser=async(
    User:User
):Promise<User>=>{

    const result=await pg.query(`INSERT INTO users (username,password,email) VALUES ($1,$2,$3) RETURNING id;`,[User.name,User.password,User.email]);
    return result.rows[0].id ;
}

export async function getUser(userId:number):Promise<User> {
    const result=await pg.query(`SELECT username,email FROM users WHERE id=$1`,[userId]);
    return result.rows[0];
}
