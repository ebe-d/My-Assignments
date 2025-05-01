import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Sidebar1 } from './Components/Sidebar'

function App() {
  
  const [sidebarOpen,setsidebarOpen]=useState(true);

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen}/>
      <Content/>
    </div>
  )
}

function Sidebar({sidebarOpen,setsidebarOpen}){
  return <div className={`transition-all duration-500 bg-red-200 h-screen ${sidebarOpen?'w-66':'w-15'} `}>
    <button className='cursor-pointer' onClick={()=>setsidebarOpen(!sidebarOpen)}>
      Side
    </button>
    {sidebarOpen?<ExpandedSidebar/>:<CollapsedSidebar/>}
  </div>
}

function ExpandedSidebar(){
 return <div>
  <div>Menu</div>
    
  </div>
}

function CollapsedSidebar(){
  return <div>
    close
  </div>
}

function Content(){
  return <div>hello</div>
}

export default App
