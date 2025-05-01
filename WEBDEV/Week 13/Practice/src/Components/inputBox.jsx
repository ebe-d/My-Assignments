


const InputBox=({children,type,onChange,reference})=>{

    return <input ref={reference} onChange={onChange} type={type} className="bg-blue-900 font-sans outline-none rounded w-80 h-12 text-white p-1 pl-3 pr-3 placeholder-gray" placeholder={children}>
    </input>
}

export default InputBox;