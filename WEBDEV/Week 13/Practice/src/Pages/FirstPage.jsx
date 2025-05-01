import { useRef, useState } from "react";
import InputBox from "../Components/inputBox";
import Button from "../Components/button";
import SecondPage from "./SecondPage";
import Logo from "../Components/logo";


const FirstPage=()=>{
    const [Disabled,setDisabled]=useState(true);
   

  function ChangeFn(){
    const value=InputRef.current.value;
    console.log(value);
    const year=parseInt(value,10);
    const currentYear=new Date().getFullYear();

    if(value.length===4 && year>=1900 && year<=currentYear){
      setDisabled(false);
    }
    else{
      setDisabled(true);
    }
  }

  function onclickFn(){
    console.log('gg');
  }


  const InputRef=useRef();

  return (
    <div className='bg-blue-800 h-screen flex justify-center items-center'>
      <div className='ml-10'>
            <Logo></Logo>
            <div className='text-white text-3xl mt-14 ml-5 font-medium'>
              Verify your Age
            </div>
            <div className='text-white mt-14 -ml-16'>
              Please Confirm your Birth Year. This Data will be stored.
            </div>
            <div className='mt-4 -ml-4'>
            <InputBox reference={InputRef} onChange={ChangeFn} type='number'>Enter your birth year</InputBox>
            </div>
            <div className='mt-8 -ml-4'>
              <Button Onclick={onclickFn} disabled={Disabled}>Continue</Button>
            </div>
            
      </div>
    </div>
  )
}

export default FirstPage;