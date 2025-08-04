
import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'

function App() {

  const [socket,setSocket]=useState();
  const InputRef=useRef<HTMLInputElement>(null);


  function sendmessage() {

    if(!socket){
      return;
    }
    const value=InputRef.current?.value;
    socket.send(value);
  }

  useEffect(()=>{
      const ws=new WebSocket("ws://localhost:8000");
      setSocket(ws);
      ws.onmessage=(eve)=>{
        alert(eve.data);
      }
    },[])

  return (
    <>
     <div>
      <input ref={InputRef} placeholder='write message'></input>
      <button onClick={sendmessage}>Send</button>     
      </div>
    </>
  )
}

export default App
