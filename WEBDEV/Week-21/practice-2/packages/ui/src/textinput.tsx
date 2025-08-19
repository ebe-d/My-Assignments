interface Input {
    placeholder:string
}


export function TextInput({placeholder}:Input){
    return <input placeholder={placeholder}>
        
    </input>
}