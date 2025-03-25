import { useEffect, useRef } from "react"

export const usePrev=(count)=>{
    const ref=useRef();

    useEffect(()=>{
        ref.current=count
    },[count])

    return ref.current;
}