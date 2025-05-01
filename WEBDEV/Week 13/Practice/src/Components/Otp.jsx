
import { useState,useRef,useEffect } from "react";

const OTP_DIGITS=6;

export default function Otp(){

    const [InputArr,setInputArr]=useState(new Array(OTP_DIGITS).fill(""));

    const ArrRef=useRef([]);

    useEffect(()=>{
        ArrRef.current[0]?.focus();
    },[])

    function HandleInputChange(value,index){

        if(isNaN(value)){return; }
        console.log(value);
        const newVal=value.trim();

        const newArr=[...InputArr];
        newArr[index]=newVal.slice(-1);
        setInputArr(newArr);

        newVal&&ArrRef.current[index+1]?.focus();
    }

    function HandleKeyDown(e,index){
        if(!e.target.value && e.key==="Backspace"){
            ArrRef.current[index-1]?.focus();
        }
    }


    return <div>
        {InputArr.map((input,index)=>{
            return <input key={index}
            type="text"
            className="w-12 h-12 rounded-xl m-1 text-center"
            value={InputArr[index]}
            onChange={(e)=>HandleInputChange(e.target.value,index)}
            ref={(input)=>(ArrRef.current[index]=input)}
            onKeyDown={(e)=>HandleKeyDown(e,index)}
            ></input>
        })}
    </div>
}



