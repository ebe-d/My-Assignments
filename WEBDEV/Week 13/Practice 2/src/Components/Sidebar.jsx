export function Sidebar1(){
    return <div className="flex">
    <div className="bg-red-200 dark:bg-black transition-all duration-1000 sm:w-70 w-5 h-screen">
        Sidebar
    </div>
    <div className="bg-green-300 dark:bg-red-200 w-full h-screen">
        Content
        <button onClick={()=>{
        const main=document.querySelector('html');
        const theme=main.getAttribute('data-theme');
        if(theme==='dark'){
            main.setAttribute('data-theme','light');
        }
        else{
            main.setAttribute('data-theme','dark')
        }
    }} className="dark:text-green-200">toggle</button>
    </div>
    
</div>
    
}