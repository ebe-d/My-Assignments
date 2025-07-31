import type { ReactElement } from "react";

export function SidebarItem({text,icon}:{text:string,icon:ReactElement})
{
return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-grey-200 rounded max-w-48 pl-2 transition-all duration-500">
    <div className="pr-2">
          {icon}
    </div>
    <div>
          {text}
    </div>
    </div>
}