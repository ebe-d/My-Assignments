import { log } from "console";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:'Email',
            credentials:{
                username:{label:'Enter Username',type:'text',placeholder:'Username'},
                password:{label:'Enter Password',type:'password',placeholder:'Email'},
                email:{label:'Enter email',type:'text',placeholder:'email'}
            },
            async authorize(credentials,req){
                const username=credentials?.username;
                const password=credentials?.password;

                console.log(username,password);

                return {
                    username:'ebe',
                    id:'1',
                    email:'ffdf'
                }
            }
        })
    ],
    pages:{
        signIn:''
    }
    ,
    secret:process.env.NEXTAUTH_SECRET
})

export {handler as GET,handler as POST}