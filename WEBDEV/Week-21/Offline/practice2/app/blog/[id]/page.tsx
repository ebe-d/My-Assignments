import { notFound } from "next/navigation";

export async function  generateStaticParams() {
    const res=await fetch("http://jsonplaceholder.typicode.com/posts");
    const posts=await res.json();

    return posts.map((post:{id:string})=>({
        id:post.id.toString(),
    }));
}

export default async function BlogPost({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
    const res=await fetch(`http://jsonplaceholder.typicode.com/posts/${id}`);
    if(!res.ok){
        return notFound();
    }
    const post=await res.json();

    return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}