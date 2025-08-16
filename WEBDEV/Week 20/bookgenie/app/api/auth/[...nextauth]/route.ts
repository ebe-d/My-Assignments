import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import Google from "next-auth/providers/google";
import { use } from "react";

const client=new PrismaClient();

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:'Username',
            credentials:{
                username:{label:'Enter username',type:'text',placeholder:'Username@123'},
                password:{label:'Enter password',type:'password',placeholder:'Password'}
            },
            async authorize(credentials) {

                const {username,password}=credentials??{};

                if(!username || !password){
                    return null;
                }

                const user=await client.user.findUnique({
                    where:{
                        username
                    },
                    select:{
                        id:true,username:true,password:true
                    }
                });

                if(!user){
                    return null;
                }

                const isValid=await bcrypt.compare(password,user.password);
                if(!isValid){
                    return null;
                }

                return {id:String(user.id),name:user.username}
            },
        }),
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages:{
        signIn:'/signin'
    },
    callbacks:{
        async redirect({url,baseUrl}) {

            if(url===baseUrl){
                return `${baseUrl}/dashboard`
            }
            return url;
        },
        async jwt({token,user}){
            if(user){
                token.id=user.id;
                token.email=user.email ?? null;
                token.name=user.name;
                token.picture=user.image ?? null;
            }
            return token
        },
        async session({session,token}){
           if(!session.user){
            session.user={} as any
           }

           const user=session.user as typeof session.user & {id?:string}
            user.id=token.id as string;
            user.email=token.email
            user.name=token.name
            user.image=token.picture
            return session
        }
        }
    }

);


export {handler as GET,handler as POST};