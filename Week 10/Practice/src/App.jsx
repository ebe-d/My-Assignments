import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
  <div>
   <BrowserRouter>
   <Routes>
    <Route path='/neet/online' element={<Class11></Class11>}></Route>
    <Route path='/neet/offline' element={<Class12></Class12>}></Route>
    <Route path='/' element={<Landing></Landing>}></Route>
   </Routes>
   </BrowserRouter>
  </div>
  )
}

function Class11(){
  return <div>
    Neet
  </div>
}

function Class12(){
  return <div>
    Hello there
  </div>
}

function Landing(){
  return <div>
    Hey there
  </div>
}

export default App
