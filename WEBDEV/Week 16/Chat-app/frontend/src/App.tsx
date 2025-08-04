
import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [messages,setMessages]=useState(["hi there","hello"]);
  const InputRef=useRef<HTMLInputElement>(null);
  const wsRef=useRef<WebSocket>(null);

  useEffect(()=>{

    const ws=new WebSocket('ws://localhost:8080');

    ws.onmessage=(eve)=>{
      setMessages(m=>[...m,eve.data])
    }
    wsRef.current=ws;
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }

    return()=>{
      wsRef.current?.close();
    }
  },[])

    return <>
  <div className="h-screen bg-black flex flex-col">
    
    <div className="flex-1 text-white p-4">
      {messages.map(message=><div className='bg-white text-black rounded-xl w-fit p-4 m-4'>{message}</div>)}
    </div>

  
  <div className="h-12 bg-white flex items-center">
    <input
      ref={InputRef}
      type="text"
      className="w-full h-full p-2 outline-none"
    />
    <button onClick={()=>{
     wsRef.current?.send(JSON.stringify({
      type:"chat",
      payload:{
        message:InputRef.current?.value
      }
     }))
    }} className="bg-purple-400 hover:bg-purple-600 h-full px-4">
      Send
    </button>
  </div>
</div>

  </>
}

export default App
