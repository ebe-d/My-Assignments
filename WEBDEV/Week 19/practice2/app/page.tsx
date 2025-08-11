import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
   <div className="text-lg w-screen h-screen flex items-center justify-center">
    <div>
       Todo App
    <br></br>
    
    <Link href='/signin'>Sign in</Link>
    <br></br>
    <Link href='/signup'>Sign up</Link>
    <br></br>
    </div>
   
   </div>
  );
}
