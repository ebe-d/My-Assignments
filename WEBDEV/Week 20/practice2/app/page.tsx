"use client"

import { SessionContext, SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";


export default function MainHome(){
  return <SessionProvider>
    <Home></Home>
  </SessionProvider>
}

 function Home() {

  const session=useSession();

  return (
   <div>
      hi there 
      {session.status=='authenticated'?<button onClick={()=>{
        signOut()
      }}>
        Log out
      </button>:<button onClick={()=>{
        signIn()
      }}>
        Sign in</button>}
   </div>
  );
}
