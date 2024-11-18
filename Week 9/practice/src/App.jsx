import { useEffect, useState } from "react";

function App(){
  let [counterBool,countervisibler]=useState(true);


  useEffect(()=>{
    setInterval(()=>{
      countervisibler(counterBool=>!counterBool)
    },3000);
  },[])

  return <div>
    {counterBool?<Counter></Counter>:null}
  </div>

}



function Counter(){
  const [count,setCount]=useState(0);

  useEffect(()=>{
  let interval=setInterval(()=>{
    setCount(count=>count+1)
  },1000);

  return function(){
    clearInterval(interval);
  }
  },[])


  return <div>
    <h1>{count}</h1>
  </div>
}

export default App