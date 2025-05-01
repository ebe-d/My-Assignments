

const Button=({disabled,Onclick,children})=>{
    return <div onClick={Onclick} className={disabled?"group bg-gray-400 w-80 h-14 flex justify-center pt-4 rounded-xl cursor-not-allowed hover:bg-gray-500":
    "group bg-green-800 w-80 h-14 flex justify-center pt-4 rounded-xl cursor-pointer hover:bg-gray-500"}>
        <span className="text-white font-semibold font-sans group-hover:text-white">{children}</span>
    </div>
}

export default Button;