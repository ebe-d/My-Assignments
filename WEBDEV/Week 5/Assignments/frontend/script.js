// const { url } = require("inspector");
document.addEventListener('DOMContentLoaded', () => {


const form = document.getElementById('signup-form');
    const messageBox = document.getElementById('message-box');

if (form){    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch('http://127.0.0.1:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
        
            if (response.status==201) {
                
                showMessage('User Registered', 'success');
                setTimeout(() => {
                    window.location.href = 'todo.html';
                }, 2000);
            }
            else{
                showMessage(data.message || 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Failed to sign up. Please try again later.', 'error');
        }
    });
}
    function showMessage(message,type){
        messageBox.textContent=message;
        messageBox.className=`message-box ${type}`;
        messageBox.style.display='block';
    }
    
// Login Form


const form2 = document.getElementById('login-form');
    const messageBox2 = document.getElementById('message-box2');


if(form2){
    form2.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username2').value;
        const password = document.getElementById('password2').value;
    
        try {
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                const token=data.token;
                localStorage.setItem('token',token);
                console.log('token received',token);
                showMessage2('Login Successful', 'success');
                setTimeout(() => {
                    window.location.href = 'todo.html';
                }, 2000);
            }
            else{
                showMessage2(data.message || 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage2('Failed to login. Please try again later.', 'error');
        }
    });
}
    function showMessage2(message,type){
        messageBox2.textContent=message;
        messageBox2.className=`message-box ${type}`;
        messageBox2.style.display='block';
    }
}); 

const button=document.getElementById('add-btn');

if(button){
    button.addEventListener('click',async (event)=>{
        event.preventDefault();
        const todo=document.getElementById('new-todo').value;

        const Name=todo;
        try{
            const token = localStorage.getItem('token');
        if(token){
            const response=await fetch ('http://127.0.0.1:3000/addTodo',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}` 
                },
                body: JSON.stringify({Name})
            });
            const data=await response.json();

            if(response.ok){
                const container=document.getElementById('todo-list');
                container.innerHTML=`<br>${todo}`;
            }
            else{
                console.log(data.message);
            }
        }
        }
        catch(err){
            console.error("error",err);
        }
    
    })
}

