const fs=require('fs');

const {Command} = require('commander');

const filename="todos.json";

const program=new Command();

program.name('TODO CLI')
.description('Perform actions related to todo')
.version('ChildBuild')

function loadtodos(){
    if(fs.existsSync(filename)){
        const data=fs.readFileSync(filename,'utf-8');
        try{
            return JSON.parse(data);
        }
        catch(error){
            console.log("File Corrupted New Array is inialized");
            return [];
        }
    }
    return [];
}

function savetodos(todo){
    fs.writeFileSync(filename,JSON.stringify(todo,null,2))
}

program.command('add')
.description('adds todo')
.argument('todo','name of todo')
.action((todo)=>{
    const todos=loadtodos();
    todos.push({name:todo,status:'pending'});
    savetodos(todos);
})

program.command('remove')
.description('removes todo')
.argument('todoName','name of the todo')
.action((todoName)=>{
    let todos=loadtodos();
    todos=todos.filter(todo=>todo.name!==todoName);
    savetodos(todos);
    console.log(`todo removed ${todoName}`)
})

program.command('mark')
.description('mark todo')
.argument('todoName','name of the todo')
.action((todoName)=>{
let todos=loadtodos();
const todo=todos.find((todo=>todo.name===todoName))
if(todo){
    todo.status='done';
    savetodos(todos);
}
else{
    console.log("not found");
}
})




program.parse();