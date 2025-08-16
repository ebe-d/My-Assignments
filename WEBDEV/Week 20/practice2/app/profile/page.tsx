"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Profile(){

    const [profile,setProfile]=useState();

    useEffect(()=>{
        const res=axios.get('http://localhost:3000/api/profile',{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>{
            setProfile(res.data.avatarUrl)
        })

    },[])
    return <div>
        {profile}
    </div>
}