import { notFound } from "next/navigation";

export const dynamicParams=true;

export async function generateStaticParams() {
    
    const res=await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos:[{id:number}]=await res.json();

    return todos.slice(0,10).map((todo:{id:number})=>({
        id:todo.id.toString()
    }))
}

export default async function Todos({params}:{params:Promise<{id:number}>}) {
    const {id}=await params;
    const res=await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if(!res){
        notFound();
    }
    const todo=await res.json();

    return (
    <div style={{ padding: "20px" }}>
      <h1>{todo.title}</h1>
      <p>{todo.body}</p>
    </div>
  );
}