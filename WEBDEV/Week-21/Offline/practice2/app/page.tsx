import Image from "next/image";

export default async function Home() {

  const response=await fetch('https://jsonplaceholder.typicode.com/todos');
  const data=await response.json();

  return (
    <div>
      {data.map((todo:any,index:any)=>
      <div key={index}>{todo.title} {todo.completed}</div>
    )
      }
    </div>
  )
}
