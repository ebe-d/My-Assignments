import axios from "axios";

export default async function BlogPosts({params}:{params:Promise<{postId:string}>}){

    const {postId}=await params;

    const response=await axios.get(`https://jsonplaceholder.typicode.com/todos/${postId}`)
    const data=response.data;

    return <div>
        {postId}

        {data.id}
        {data.title}
    </div>
}