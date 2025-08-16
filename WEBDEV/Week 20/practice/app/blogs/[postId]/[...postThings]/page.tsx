export default async function Demo({params}:{params:Promise<{postThings:string[]}>}){

    const {postThings}=await params;
    const exec=JSON.stringify(postThings)
   
    return <div>
        {exec}
    
    </div>
}