import { useEffect, useState } from "react";
import { SidebarIcon } from "./Components/Icons/sidebarIcon";
import { FirstIcon } from "./Components/Icons/FirstIcon";
import { SecondIcon } from "./Components/Icons/Second";
import { ThirdIcon } from "./Components/Icons/Third";
import { FourthIcon } from "./Components/Icons/FourthIcon";

function App() {

  const useMediaQuery=(query)=>{
    const [matches,setMatches]=useState(true);

    useEffect(()=>{

      const media=window.matchMedia(query);
      setMatches(media.matches);

      const listener=(e)=>setMatches(e.matches);
      media.addEventListener('change',listener);

      return ()=> media.removeEventListener('change',listener);
    },[query]);

    return matches;
  }


  const [sidebarOpen,setsidebarOpen]=useState(true);
  const isDesktop=useMediaQuery("(min-width:768px)");

  useEffect(()=>{
    if(isDesktop){
      setsidebarOpen(false)
    }
    else{
      setsidebarOpen(true)
    }
  },[isDesktop])

  return <div className="flex">
    <Sidebar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen}/>
    <Content sidebarOpen={sidebarOpen}/>
  </div>
}

function Sidebar({setsidebarOpen,sidebarOpen}){

  if (sidebarOpen){
    return <div className="fixed sm:relative bg-green-200 w-46 h-screen transition-all duration-1000">
      <div className="cursor-pointer pt-5 flex" onClick={()=>{setsidebarOpen(!sidebarOpen)}}>
        <SidebarIcon/>
        <span className="pl-2 pt-1 select-none">Menu</span>
      </div>
      <div className="mt-5 flex">
        <FirstIcon/>
        <div className="pl-2 pt-1 select-none">Events</div>
      </div>
      <div  className="mt-5 flex">
        <SecondIcon/>
        <div className="pl-2 pt-1 select-none">Yada</div>
      </div>
      <div  className="mt-5 flex">
        <ThirdIcon/>
        <div className="pl-2 pt-1 select-none">Yadap</div>
      </div>
      <div  className="mt-5 flex">
        <FourthIcon/>
        <div className="pl-2 pt-1 select-none">Ghana</div>
      </div>
    </div>
  }
  return <div className="bg-green-200 w-9 h-screen transition-all duration-1000">
  <div className="cursor-pointer w-9 pt-5" onClick={()=>{setsidebarOpen(!sidebarOpen)}}>
    <SidebarIcon/>
  </div>
  <div className="mt-5">
    <FirstIcon/>
  </div>
  <div  className="mt-5">
    <SecondIcon/>
  </div>
  <div  className="mt-5">
    <ThirdIcon/>
  </div>
  <div  className="mt-5">
    <FourthIcon/>
  </div>
</div>
 
}

function Content({sidebarOpen}){
  return <div className="w-full">
      <div className="h-32 bg-black sm:block hidden"></div>
    <div className="sm:grid grid-cols-11 gap-10 p-10">
      <div className="h-100 -translate-y-32 col-span-4 bg-pink-200 shadow rounded-xl"></div>
      <div className="h-72 col-span-5 bg-yellow-200 shadow rounded-xl"></div>
      <div className="h-82 col-span-2 bg-red-200 shadow rounded-xl"></div>
    </div>
  </div>
}
export default App;