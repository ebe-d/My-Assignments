
"use client";
import axios from "axios";

export default function Signin(){
    return ( <div>
        <input placeholder="username"></input>
        <input placeholder="password"></input>
        <button onClick={async()=>{
            const res=await axios.post('http://localhost:3000/api/signin',{
                username:"ais",
                password:"dsd"
            })
            localStorage.setItem('token',res.data.token)

        }}>Sign in</button>
    </div>
    );
}