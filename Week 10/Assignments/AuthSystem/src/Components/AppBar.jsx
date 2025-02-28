import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import { useCAuth,useAuth } from "../Context/AuthContext";


function AppBar({users1}){

    const navigate=useNavigate();
    const {checked1}=useCAuth();
    const {users}=useAuth();

    function ShowLogin1(){
   
        navigate('/')
        
    }
    function ShowLogin(){
   
        navigate('/')
        
    }
    
   return <>
   {checked1?
    <div style={{backgroundColor:'blueviolet',width:'100vw',height:100,marginTop:-10,marginLeft:-10,display:'flex',justifyContent:'space-between'}}>
        
        <div style={{color:'wheat',fontSize:35,paddingLeft:25,paddingTop:25}}>
            Auth System Demo
        </div>
        <div style={{display:'flex'}}>
                <div style={{color:'wheat',fontSize:25,paddingRight:25,paddingTop:35}}>
                   {users.name?`Welcome ${users.name}`:'Welcome'}
                </div>
                {users?<button onClick={ShowLogin} style={{width:100,height:50,marginTop:25,marginRight:25}}>Logout</button>
                :<button onClick={ShowLogin} style={{width:100,height:50,marginTop:25,marginRight:25}}>Login</button>}
                
        </div>
        
    </div>
    :
    <div style={{backgroundColor:'blueviolet',width:'100vw',height:100,marginTop:-10,marginLeft:-10,display:'flex',justifyContent:'space-between'}}>
        
        <div style={{color:'wheat',fontSize:35,paddingLeft:25,paddingTop:25}}>
            Auth System Demo
        </div>
        <div style={{display:'flex'}}>
                <div style={{color:'wheat',fontSize:25,paddingRight:25,paddingTop:35}}>
                   {users1?.name?`Welcome ${users1?.name}`:'Welcome'}
                </div>
                {users1?<button onClick={ShowLogin1} style={{width:100,height:50,marginTop:25,marginRight:25}}>Logout</button>
                :<button onClick={ShowLogin1} style={{width:100,height:50,marginTop:25,marginRight:25}}>Login</button>}
                
        </div>
        
    </div>
   }
    </>


}



export default AppBar