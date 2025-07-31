import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signin(){

    const usernameRef=useRef<HTMLInputElement>(null);
    const PasswordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = PasswordRef.current?.value;

        const response=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        });
        const jwt=response.data.token;
        localStorage.setItem('token',jwt);
        navigate("/dashboard");
    }
    return <div className="h-screen w-screen bg-grey-200 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48 p-8 rounded-xl">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={PasswordRef} placeholder="Password"/>
            <div className="flex justify-center p-4">
                     <Button onClick={signin} loading={false} fullWidth={true} variant="primary" text="Signin"/>
            </div>
           
        </div>
    </div>
}