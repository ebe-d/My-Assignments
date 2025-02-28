
import React, { createContext, useContext, useState } from 'react';
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil';

const count = atom({
  key: 'countState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

function Parent() {
  return (
    <RecoilRoot>
      <Incrase />
      <Decrease />
      <Value />
    </RecoilRoot>
  );
}

function Decrease() {
  const setCount = useSetRecoilState(count);
  return <button onClick={() => setCount(count => count - 1)}>Decrease</button>;
}

function Incrase() {
  const setCount = useSetRecoilState(count);
  return <button onClick={() => setCount(count => count + 1)}>Increase</button>;
}

function Value() {
  const countValue = useRecoilValue(count);
  return <p>Count: {countValue}</p>;
}

// App Component
const App = () => {
  return <div>
    <Parent />
  </div>
};

export default App;







































// import { useState,useRef, createContext, useContext } from 'react'
// import './App.css'


// const CountContext=createContext();

// function CountSumUp({children}){
 
//   const [count,setCount]=useState(0);

//   return <CountContext.Provider value={{
//     count:count,
//     setCount:setCount
//   }}>
//     {children}
//     </CountContext.Provider>
// }



// function Parent(){
//   return <div>
//     <CountSumUp>
//           <Increase/>
//           <Count/>
//           <Decrease/>
//     </CountSumUp>
//   </div>
// }

// function Increase(){
//   const {setCount}=useContext(CountContext);
//   return <div>
//     <button onClick={()=>setCount(count=>count+1)}>
//       Increase
//     </button>
//   </div>
// }

// function Count(){
//   const {count}=useContext(CountContext)

//   return <div>
//     {count}
//   </div>
// }
// function Decrease(){
//   const {count,setCount}=useContext(CountContext);
//   return <div>
//     <button onClick={()=>{setCount(count-1)}}>
//       Decrease
//     </button>
//   </div>
// }



// function App() {

//  return <div> 
//       <Parent/>
//     </div>
// }
// export default App
