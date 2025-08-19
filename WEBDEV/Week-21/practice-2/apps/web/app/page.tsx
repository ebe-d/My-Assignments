import { TextInput } from '@repo/ui/textinput';

export default function Home() {
  return (
    <div style={{ background: 'black', height: '100vh', width: '100vw' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px',
          height: '100%',  
          width: '100%',   
        }}
      >
        <TextInput placeholder="Room ID" />
        <button>Join Room</button>
      </div>
    </div>
  );
}
