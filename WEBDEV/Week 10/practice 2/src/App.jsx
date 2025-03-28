import React from 'react';


function App(){

  const todos=[
    {
      title:'go to gym',
      done:false
    },
    {
      title:'eat',
      done:true
    },{
      title:'bath'
    }
  ]

  const todocomponents=todos.map((todo,index)=><ErrorBoundary><Card key={index} title={todo.title} done={todo.done}/></ErrorBoundary>)

  return (
    <div>
      {todocomponents}
    </div>
  )
}

const Card= (props)=>{
   
  
  return <div style={{display:"flex"}}>
    {props.title}
    {props.done}
  </div>
}

class ErrorBoundary extends React.Component {
  constructor(props) {
      super(props);
      this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
      return { hasError: true };
  }

  componentDidCatch(error, info) {
      console.error("Error caught:", error, info);
  }

  render() {
      if (this.state.hasError) {
          return <h1>Something went wrong.</h1>;
      }

      return this.props.children; 
  }
}


export default App;