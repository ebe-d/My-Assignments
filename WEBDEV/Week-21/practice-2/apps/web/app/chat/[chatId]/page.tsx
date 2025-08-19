import { TextInput } from "@repo/ui/textinput";

export default function ChatPage(){
    return <div style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        height:'100vh',
        width:'100vw'
    }}>
        <div>Chat Here</div>
        <div>
            <TextInput placeholder="enter here"></TextInput>
            <button>send</button>
        </div>
    </div>
}