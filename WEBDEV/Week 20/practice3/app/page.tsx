// "use client"

import { Session } from "inspector/promises";
import { getServerSession } from "next-auth"

// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";

// export default function Home() {

//   return (
//    <SessionProvider>
//     <OtherHome/>
//    </SessionProvider>
//   );
// }

// function OtherHome(){
//   const session=useSession();

//   return <div>
//     {session.status=='authenticated' && <button onClick={()=>{
//       signOut()
//     }}>Logout</button>}
//     {session.status=='unauthenticated' && <button onClick={()=>{
//       signIn()
//     }}>SignIn</button>}
//   </div>
// }



export default async function Home (){

  const session:Session=await getServerSession();
  
  type Session=Awaited<ReturnType<typeof getServerSession>>

  return <div>
    {JSON.stringify(session)}
  </div>
}