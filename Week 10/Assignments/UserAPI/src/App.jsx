
import {useState,useEffect} from 'react'
import axios from 'axios'

function App(){

  const [data,setData]=useState([]);
  const [loading,Isloading]=useState(true)
  const [error,setError]=useState(null)
  const [count,setCount]=useState(0)
  

  useEffect(()=>{
    axios
    .get('https://randomuser.me/api/')
    .then((response)=>{
      setData(response.data.results)
      Isloading(false)
    }).
    catch((err)=>{
      setError(err.message);
      Isloading(false)
    })
  },[]);

  if (loading) return <p>Loading</p>
  if (error) return <p>Error {error}</p>

    function LoadMore() {
      
        axios
        .get(`https://randomuser.me/api/?results=${count}`)
        .then((response)=>{
          setData((prevdata)=>[...prevdata,...response.data.results]);
        }).
        catch((err)=>{
          setError(err.message);
          Isloading(false)
        })
    }

  return <>
  <div style={{display:'flex',justifyContent:'center',fontSize:70,marginBottom:100}}>RANDOM USERS</div>
    <div style={{display:"flex",flexWrap:'wrap',gap:20,justifyContent:'center'}}>
      {data.map((post,index)=>(
              
             <div key={index} style={{display:'flex',flexDirection:'column' ,alignContent:'center',alignItems:'center',gap:30, border: '5px solid black'}}>
              <img src={post.picture.medium} style={{height:200}}></img>
              <span style={{fontSize:20}}>{post.name.first} {post.name.last}</span>
            </div>
      ))}
    </div>
    <input
          type="number"
          placeholder="Enter number of users"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          style={{ padding: 10, fontSize: 18 }}
        />
    <button onClick={LoadMore} style={{fontSize:20,height:40,marginLeft:'50vw',marginTop:20}}>Load More Users</button>
  </>

}


export default App;




//
// for (let index = 0; index < 10; index++) {
//   divs.push(
    // <div style={{display:'flex',flexDirection:'column' ,alignContent:'center',alignItems:'center',gap:30, border: '5px solid black'}}>
    //   <img src='https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg' style={{height:200}}></img>
    //   <span style={{fontSize:40}}>Harkirat</span>
    // </div>
//   )
// }