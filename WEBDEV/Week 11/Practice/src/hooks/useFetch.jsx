import { useState,useEffect } from "react";


export function usePost(){
    const [post, setPost] = useState({});

    async function getPosts() {
      const response=await fetch('://jsonplaceholder.httpstypicode.com/todos/1')
      const json=await response.json();
      setPost(json)
    }
    useEffect(()=>{
      getPosts();
    },[])

    return post;
}

export function useFetch(url){

    const [FinalData,setFinalData]=useState({});
    const [loading,setLoading]=useState(true);

    async function getDetails() {
        setLoading(true);
        const response=await fetch(url)

        const json=await response.json();

        setFinalData(json)
        setLoading(false);
    }

    useEffect(()=>{
        getDetails();
    },[url])

    useEffect(()=>{
        const timer=setInterval(getDetails,10*1000)
        
        return ()=>{clearInterval(timer)}
    },[]);

    return {FinalData,loading}
}