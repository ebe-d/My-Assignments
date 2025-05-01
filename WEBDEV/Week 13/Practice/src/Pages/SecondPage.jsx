import { useRef, useState } from "react";
import Button from "../Components/button";
import InputBox from "../Components/inputBox";
import Logo from "../Components/logo";


function SecondPage(){

    const [Disabled,setDisabled]=useState(true);



    function checkFn(){
        console.log('hi check button');
    }

    function InputFn(){

        const value=InputRef.current.value
        console.log(value);
        
        if(value.length>=10&&value.length<=25&&value.endsWith('@gmail.com')){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }

    const InputRef=useRef();

    return <>
        <div className="bg-blue-800 h-screen flex justify-center items-center">
            <div>
                <div className='ml-8'>
                <Logo/>
                </div>
                
                <div className="text-white text-3xl mt-10 ml-11">
                    Lets Get Started
                </div>
                <div className='mt-10'>
                    <InputBox type='string' onChange={InputFn} reference={InputRef} >Email Id</InputBox>
                </div>
                <div className="mt-10">
                    <Button Onclick={checkFn} disabled={Disabled}>Continue</Button>
                </div>
            </div>
        </div>
    </>
}

export default SecondPage;