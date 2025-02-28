import { useNavigate } from "react-router-dom";
import { useState,useEffect,useContext} from 'react'
import { useCAuth,useAuth } from "../Context/AuthContext";





function Login({ users1 = {}, getUsers1 = () => {} })  {
    
    const {checked1}=useCAuth();
    const {users,getUsers}=useAuth();
    const [tempUsers,getTempUsers]=useState({
        name:'',
        password:''
    })

    const navigate=useNavigate();
  
    useEffect(() => {
    
        if (users1?.name && users1?.password) {
          alert(`Name: ${users1?.name} Password: ${users1?.password}`);
          navigate("/home"); 
        }
      }, [users1]);  

      useEffect(() => {
    
        if (users.name && users.password) {
          alert(`Name: ${users.name} Password: ${users.password}`);
          navigate("/home"); 
        }
      }, [users]);

    function handleSubmit(event){
    event.preventDefault();
    
    
    if(checked1){
    

        getUsers((users)=>({
            ...users,
            name:tempUsers.name,
            password:tempUsers.password
        }))     
            
   

    }
   

    else{


        getUsers1((users1)=>({
            ...users1,
            name:tempUsers.name,
            password:tempUsers.password
        }))
        
       
        }

    }
    

function handleChange(event){
    const {name,value}=event.target;
    getTempUsers((tempUsers)=>({
        ...tempUsers,
        [name]:value,
    }))
}


  return <>  
   <form style={{display:'flex',flexDirection:"column",gap:10}} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' style={{width:'50vw',height:25}} value={tempUsers.name} onChange={handleChange}></input>
            <label htmlFor="Password">Password</label>
            <input type='text' name='password'style={{width:'50vw',height:25}} value={tempUsers.password} onChange={handleChange} />
            <button type='submit' style={{width:'50vw',height:25}}>Submit</button>
    </form>

  </>
}


export default Login