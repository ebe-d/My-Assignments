import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET=process.env.JWT_PASS
export const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    // Allow GET requests to content without authentication
    if (req.method === 'GET' && req.path.startsWith('/api/v1/content')) {
        return next();
    }

    const header=req.headers['authorization'];

    if(!header){
        res.status(401).json({message:'Not Authenticated'});
        return;
    }
    
    try {
        const decoded = jwt.verify(header as string, JWT_SECRET as string) as { id: string };
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({
            message: 'Invalid or expired token. Please log in again.'
        });
    }
   
}