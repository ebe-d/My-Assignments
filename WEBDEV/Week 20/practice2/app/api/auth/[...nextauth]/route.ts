

import { log } from "console";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:"Login with email",
            credentials:{
                username:{label:"username",placeholder:'username@gmail.com',type:'text'},
                password:{label:'password',type:"password"},
                adminpass:{label:'adminpass',type:"text"}
            },
            async authorize(credentials,req){
                const username=credentials?.username;
                const password=credentials?.password;
                console.log(username,password);
                
                const user={
                    name:'fdd',
                    id:"1",
                    username:'sdsd'
                }

                if(user){
                    return user
                }
                else{
                    return null;
                }
            }
        })
    ]
})

export {handler as GET,handler as POST}