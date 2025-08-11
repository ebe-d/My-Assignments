import axios from "axios";

async function getBlogs(){
    const response=await axios.get("https://jsonplaceholder.typicode.com/todos")
    return response.data
}




export default async function Blogs(){

    const blogs=await getBlogs();

    return <>
       {blogs.map((blog:ITodo,index:number)=><Todo key={index} id={index}  title={blog.title} completed={blog.completed}/>)}
    </>
}

interface ITodo{
    title:string,
    completed:Boolean,
    id?:number
}

function Todo ( todo:ITodo){
    return <div id={String(todo.id)}>
        {todo.title} {todo.completed?'done':'not done'}
    </div>
}