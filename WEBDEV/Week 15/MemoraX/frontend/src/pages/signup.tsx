import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){

    const usernameRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                username,
                password
        })
        alert("signed up");
        navigate("/signin");
    }
    return <div className="h-screen w-screen bg-grey-200 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48 p-8 rounded-xl">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center p-4">
                     <Button onClick={signup} loading={false} fullWidth={true} variant="primary" text="Signup"/>
            </div>
           
        </div>
    </div>
}