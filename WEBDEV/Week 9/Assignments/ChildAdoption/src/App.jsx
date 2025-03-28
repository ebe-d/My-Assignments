import { Children, useState } from "react";
import { Form } from "./form";
import bgimage from '../src/assets/children.jpg'
import { Table } from "./table";


function App(){

  const [formData,setformData]=useState([]);


  return (
    <>
    <div style={{
      backgroundImage:`url(${bgimage})`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat',
      backgroundAttachment:'fixed',
      backgroundPosition:'center',
      height:'100vh',
      width:'100vw',
      display:'flex',
      alignContent:'center',
      justifyContent:'center',
    }}>
        <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set opacity to 0.8
    width: '1400px',
    height: '600px',
    justifyContent: 'center',
    borderRadius: '10px',
    marginTop: '200px',
    marginLeft: '50px'
}}>

        <Header>Child Adoption</Header>
                <div id="MainDisplay" style={{display:'flex',justifyContent:'center',marginTop:'70px'}}>
                <Form formData={formData} setformData={setformData}></Form>
                </div>
        </div>
    </div>
    </>
  )
}

function Header({children})
{
  return (
    <div style={{
      display:'grid',
      justifyContent:'center'
    }}>
      <h1>{children}</h1>
    </div>
  )
}
export default App