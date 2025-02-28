import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppBar
 from './Components/AppBar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {createContext, useContext} from 'react'

import Login from './Components/login'
import Home from './Components/home'
import UserContextSetup from './Context/AuthContext'
import AuthContext from './Context/AuthContext'

import { useCAuth } from "./Context/AuthContext";


function App() {
  
  const {checked1,SetChecked1}=useCAuth();
  const [users1,getUsers1]=useState({
    name:'',
    password:''
  })
  
 
  const [checked,setchecked]=useState(false);

  function CheckBoxComponent({checked,setchecked,children}){

    return <div>
    <input type='checkbox' id='checkbox' checked={checked} 
    onChange={()=>setchecked(!checked)}></input>
    {children}
    </div>
  }
  
  function CheckBoxComponent2({children}){

    return <div>
    <input type='checkbox' id='checkbox' checked={checked1} 
    onChange={()=>SetChecked1(!checked1)}></input>
    {children}
    </div>
  }
  return (
    <>
    {!checked?
    <BrowserRouter>
    <AuthContext>
    <AppBar users1={users1} getUsers1={getUsers1}/>
    <CheckBoxComponent checked={checked} setchecked={setchecked}>
               Context API {checked?'On':'Off'}
    </CheckBoxComponent>
    <Routes>
      <Route path='/' element={<Login users1={users1} getUsers1={getUsers1} checked={checked}/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </AuthContext>
    </BrowserRouter>
    :

    <BrowserRouter>
    <AuthContext>
    <AppBar/>
    <CheckBoxComponent2>
               Context API {checked1?'On':'Off'}
    </CheckBoxComponent2>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </AuthContext>
    </BrowserRouter>
    }
    </>
  )
}


export default App
