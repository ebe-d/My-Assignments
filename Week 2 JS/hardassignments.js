// // First Aassignment
class Todo{
    constructor(){
        this.todo=[]
    }
    add(todo){
        this.todo.push(todo)
    }
    remove(indexoftodo){
        if(indexoftodo<0 || indexoftodo>=this.todo.length)
        {
            return;
        }
        this.todo.splice(indexoftodo,1)
    }
    update(indexoftodo,updatedtodo)
    {
        if(indexoftodo<0 || indexoftodo>=this.todo.length)
            {
                return;
            }
        this.todo[indexoftodo]=updatedtodo
    }
    getall(){
       return this.todo
    }
    get(indexoftodo){
        if(indexoftodo<0 || indexoftodo>=this.todo.length)
            {
                return;
            }
        return this.todo[indexoftodo]
    }
    clear(){
        this.todo=[]
    }
}


//Second Assignment
class Calculator{
    constructor(){
        this.result=0
    }
    add(number){
        this.result+=number
    }
    substract(number){
        this.result-=number
    }
    divide(number){
        if (number==0)
        {
            console.log("Cant divide by zero")
        }
        this.result/=number
    }
    multiply(number){
        this.result*=number
    }
    clear(){
        this.result=0
    }
    getresult()
    {
        return this.result
    }

}