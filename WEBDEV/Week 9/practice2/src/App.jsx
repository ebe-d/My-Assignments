// import { useState } from "react";
// import { PostComponent } from "./post";

import { useEffect, useState } from "react"

// function App(){

//   const [posts,setPosts]=useState([])


//   const postsComponents=posts.map(post=><PostComponent
//     name={post.name}
//     subtitle={post.subtitle}
//     time={post.time}
//     image={post.image}
//     description={post.description}
//     />
//   )

//   function addPost(){
//     setPosts([...posts,{
//       image:"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
//       name:"har",
//       subtitle:"100 followers",
//       time:"2m ago",
//       description:"be true"
//     }])
//   }

// return (
//   <div style={{background:"#dfe6e9",height:"100vh"}}>
//     <button onClick={addPost}>Add Post</button>
//     <div style={{display:"flex",justifyContent:"center"}}>
//       <div>
//       {postsComponents}
//       </div>
//     </div>
//   </div>
// )
// }

// export default App


// function App(){ 

//   const [count,setCount]=useState(0)
//   const [count2,setCount2]=useState(0)

//   useEffect(
//     ()=>{
//       const interval=setInterval(()=>setCount(count=>count+1),2000)
//       return ()=> clearInterval(interval)
//     },[]
//   )

//   useEffect(
//     ()=>{
//       const interval2=setInterval(()=>setCount2((count2)=>count2-1),2000)
//       return ()=>clearInterval(interval2)
//     },[]
//   )

//   useEffect(
//     ()=>{
//       console.log("count increased")
//     },[count,count2]
//   )

//   function increase(){
//     setCount(count+1)
//   }

//   return (
//     <div>
//        <div> 
//             <div style={{backgroundColor:"red",borderRadius:20,width:45,height:45,paddingLeft:10,paddingTop:5}}>{count}<br></br>{count2}</div>
//       </div>
//       <img src={"https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
//       style={{cursor:"pointer"}} width={40}
//       />
//       <button onClick={increase}>increase</button>
//     </div>
//   )
// }

// export default App 

// function App(){

//   const [currentTab,SwitchTab]=useState(0);
//   const [TabData,setTabData]=useState({});
//   const [Loader,setLoader]=useState(true);

//   useEffect(()=>{
//     setLoader(true)
//     fetch('https://jsonplaceholder.typicode.com/todos/'+currentTab)
//     .then(
//      async(res)=>{ 
//       const json=await res.json();
//       setTabData(json)
//       setLoader(false)
//      }
//     )
//   },[currentTab])

//   return <div>
//     <button onClick={()=>{SwitchTab(1)}} style={{color:currentTab==1?"red":"black"}}>todo1</button>
//     <button onClick={()=>{SwitchTab(2)}} style={{color:currentTab==2?"red":"black"}}>todo2</button>
//     <button onClick={()=>{SwitchTab(3)}} style={{color:currentTab==3?"red":"black"}}>todo3</button>
//     <button onClick={()=>{SwitchTab(4)}} style={{color:currentTab==4?"red":"black"}}>todo4</button>
//     <br></br>
//     {Loader==true?"Loading..":TabData.title}
//   </div>
// }
 
// export default App


// function App(){

//   const [TimerVisible,Visibler]=useState(true)


//   useEffect(()=>{

//     setInterval(()=>{
//       Visibler(TimerVisible=>!TimerVisible)
//     },5000)

//   },[])

//   function Calci(){

//     const [Timer,SetTimer]=useState(0);

  

//   useEffect(()=>{
//     console.log("counter");
    
//     let interval=setInterval(()=>{
//       console.log("from in");
//       SetTimer((timer)=>timer+1)
//       },1000)

//       return ()=>{
//         clearInterval(interval)
//         console.log("timer interval cleared");
        
//       }
//     },[])


//     return <div style={{display:TimerVisible?"block":"none"}}>{Timer} are elapsed</div>
//   }

//   return <div>
//   <Calci></Calci>
//   </div>
// }

// export default App


// function App(){

//   return <div style={{display:"flex"}}>

// <Card>
//       hi there
//     </Card>
// <Card innerContent={<div>hi there </div>}/>

//   </div>
    
// }

// function Card({innerContent,children}){

//   return <div style={{background:"black",borderRadius:10,color:"white"}}>
//     {innerContent}
//     {children}
//   </div>
// }

// export default App


// import React from 'react';

// const Card = ({ children }) => {
//     return (
//         <div style={{
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             padding: '20px',
//             margin: '10px',
//             boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
//         }}>
//             {children}
//         </div>
//     );
// };

// const App = () => {
//     return (
//         <div>
//             <Card>
//                 <h2>Card Title</h2>
//                 <p>This is some content inside the card.</p>
//             </Card>
//             <Card>
//                 <h2>Another Card</h2>
//                 <p>This card has different content!</p>
//             </Card>
//         </div>
//     );
// };

// export default App;


function App(){

  const Todos=[{
    title:"go to bath",
    done:false,
    counter:1
  },
{
  title:"eat",
  done:true,
  counter:2
}]


const TodoComponents=Todos.map(todo=><Todo key={todo.counter} count={todo.counter} title={todo.title} done={todo.done}></Todo>)

return <div>
  {TodoComponents}
</div>
}

function Todo(props){
  return <div>
    {props.count}
    {props.title}
    {props.done?"done":"not done"}
  </div>
}


export default App