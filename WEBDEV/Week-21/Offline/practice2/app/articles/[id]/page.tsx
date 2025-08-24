import { notFound } from "next/navigation";

export const dynamicParams=true;

export async function generateStaticParams() {
    const res=await fetch('https://jsonplaceholder.typicode.com/users')
    const users:[{id:number}]=await res.json();

    return users.slice(0,5).map((user:{id:number})=>({
        id:user.id.toString()
    }))
}

export async function getPost(id:number){
    const res=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        next:{revalidate:60}
    });
    if(!res.ok)return null;
    return res.json();
}

export default async function UserPosts({params}:{params:Promise<{id:number}>}){
    const {id}=await params
    const post=await getPost(id);
    if(!post) return notFound();

     return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <small>⏱ Revalidates every 60s</small>
    </div>
  );
}