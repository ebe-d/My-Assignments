document.addEventListener('DOMContentLoaded',()=>{
    
    const signupform=document.getElementById('signup-form');
    const messageBox=document.getElementById('message-box');

    if(signupform){
        signupform.addEventListener('submit',async(event)=>{
            event.preventDefault();

            const username=document.getElementById('username').value;
            const password=document.getElementById('password').value;

            try{
                const response=await fetch('http://127.0.0.1:3000/signup',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({username,password})
            });
            const data=await response.json();

            if(response.status==200){
                ShowMessage('User Registered','success');
                setTimeout(()=>{
                    window.location.href='login.html'
                },2000);
            }
            else{
                ShowMessage(data.message || data.error );
            }
            }
            catch(error){
                console.error(error);
                ShowMessage('Failed to sign up','error')
            }
        })
    }

    function ShowMessage(message,type){
        messageBox.textContent=message;
        messageBox.className=`message-box ${type}`;
        messageBox.style.display='block';
        setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000); 
    }



const loginform=document.getElementById('login-form');

const messageBox2=document.getElementById('message-box')

if(loginform){
    loginform.addEventListener('submit',async(event)=>{
        event.preventDefault();

        const username=document.getElementById('username2').value;
        const password=document.getElementById('password2').value;

        try{
            const response=await fetch('http://127.0.0.1:3000/login',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({username,password}),
            });

            const data=await response.json();

            if(response.status==200){
                const token=data.token;
                localStorage.setItem('token',token);
                console.log(token);
                ShowMessage2('Login Succesful','success');
                setTimeout(()=>{
                    window.location.href='bookmark.html'
                },2000);
            }
            else{
                ShowMessage2(data.message || data.error);
            }
        }
        catch(error){
        
            console.log(error);
            ShowMessage2('Failed to login','error')
        }
    })
}

function ShowMessage2(message,type){
    messageBox2.textContent=message;
    messageBox2.className=`message-box ${type}`;
    messageBox2.style.display='block';
    setTimeout(() => {
        messageBox2.style.display = 'none';
    }, 3000); 
}

const messageBox3=document.getElementById('messageBoxBook');

function ShowMessage3(message,type){
    messageBox3.textContent=message;
    messageBox3.className=`message-box ${type}`;
    messageBox3.style.display='block';
    setTimeout(() => {
        messageBox3.style.display = 'none';
    }, 3000); 
}

window.logout=function(){
    localStorage.removeItem('token');
    window.location.href='login.html'
}

function getIconForUrl(url) {
        let iconUrl = '';
        
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png'; // YouTube icon
        } 
    
        else if (url.includes('twitter.com')) {
            iconUrl = 'https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_bird_logo_2012.svg'; // Twitter icon
        } 
    
        else {
            iconUrl = 'https://via.placeholder.com/24'; 
        }
        return iconUrl; 
}

const Add = document.getElementById('addButton');

if (Add) {
    Add.addEventListener('click', async (event) => {
        event.preventDefault();
        const url = document.getElementById('linkInput').value;
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await fetch('http://127.0.0.1:3000/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ url })
                });
                const data = await response.json();

                if (response.status === 200) {
                    const container = document.getElementById("bookmarks");
                    const spanElement = document.createElement('span');
                
                    spanElement.style.display = 'flex';
                    spanElement.style.alignItems = 'center'; 
                    spanElement.style.marginBottom = '10px'; 
                    
            
                    spanElement.innerHTML += `<a href="${url}" style="margin-right: 10px; color: #6a11cb; text-decoration: none;" target="_blank">${url}</a>`;
                    
            
                
                    const buttonElement = document.createElement('button');
                    buttonElement.setAttribute('type', 'button'); 
                    buttonElement.textContent = 'Delete';
                    buttonElement.style.padding = '10px';
                    buttonElement.style.background = '#6a11cb';
                    buttonElement.style.color = 'white';
                    buttonElement.style.border = 'none';
                    buttonElement.style.borderRadius = '5px';
                    buttonElement.style.cursor = 'pointer';
                    buttonElement.style.transition = 'background 0.3s';
                    buttonElement.style.width = '75px';

                    buttonElement.addEventListener('click', async function() {
                        event.preventDefault();
                        container.removeChild(spanElement);
                        try{                     
                        const token=localStorage.getItem('token');
                        if(token){
                            const response=await fetch('http://127.0.0.1:3000/delete',{
                                method:'DELETE',
                                headers:{
                                    'Content-Type':'application/json',
                                    'Authorization':`${token}`
                                },
                                body: JSON.stringify({url})
                            });
                            const data=await response.json();
                            if (response.status==200){
                                ShowMessage3(data.message,'success')
                            }
                            else
                            {
                                ShowMessage3(data.error,'error');
                            }
                        }
                        }
                        catch(err){
                            console.log(err);
                            ShowMessage3(err,'error');
                        }
                    });
                    
                    
                    const img = document.createElement('img');
                    let imgurl = getIconForUrl(url); 
                    img.src = imgurl;
                    img.alt = 'Link Icon'; 
                    img.style.width = '24px'; 
                    img.style.height = '20px';
                    img.style.marginRight = '10px'; 
                    
                    
                    spanElement.appendChild(img);
                    spanElement.appendChild(buttonElement);
                    
                    
                    container.appendChild(spanElement); 
                    ClearInput();
                    
                    function ClearInput(){
                        document.getElementById('linkInput').value=" "
                    }
                                 
                } else {
                    console.log(data.message || data.error ); 
                }
            } else {
                console.log('Token not found');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
}
////////////////////////////////////






async function loadBookmarks() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch('http://127.0.0.1:3000/bookmarks', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                }
            });
            const data = await response.json();

            if (response.status === 200) {
                const container = document.getElementById("bookmarks");
                container.innerHTML = ''; // Clear existing bookmarks before loading new ones

                data.bookmarks.forEach(bookmark => {
                    const spanElement = document.createElement('span');
                    spanElement.style.display = 'flex';
                    spanElement.style.alignItems = 'center';
                    spanElement.style.marginBottom = '10px';

                    spanElement.innerHTML += `<a href="${bookmark.url}" style="margin-right: 10px; color: #6a11cb; text-decoration: none;">${bookmark.url}</a>`;

                    // Create the delete button for each bookmark
                    const buttonElement = document.createElement('button');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.textContent = 'Delete';
                    buttonElement.style.padding = '10px';
                    buttonElement.style.background = '#6a11cb';
                    buttonElement.style.color = 'white';
                    buttonElement.style.border = 'none';
                    buttonElement.style.borderRadius = '5px';
                    buttonElement.style.cursor = 'pointer';
                    buttonElement.style.transition = 'background 0.3s';
                    buttonElement.style.width = '75px';

                    buttonElement.addEventListener('click', async function() {
                        spanElement.remove(); // Remove the span from the DOM
                        try {
                            const token = localStorage.getItem('token');
                            if (token) {
                                const response = await fetch('http://127.0.0.1:3000/delete', {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `${token}`
                                    },
                                    body: JSON.stringify({ url: bookmark.url }) // Send the URL to delete
                                });
                                const data = await response.json();
                                if (response.status == 200) {
                                    ShowMessage3(data.message, 'success');
                                } else {
                                    ShowMessage3(data.error, 'error');
                                }
                            }
                        } catch (err) {
                            console.log(err);
                            ShowMessage3(err, 'error');
                        }
                    });

                    const img = document.createElement('img');
                    let imgurl = getIconForUrl(bookmark.url);
                    img.src = imgurl;
                    img.alt = 'Link Icon';
                    img.style.width = '24px';
                    img.style.height = '20px';
                    img.style.marginRight = '10px';

                    spanElement.appendChild(img);
                    spanElement.appendChild(buttonElement);
                    container.appendChild(spanElement);
                });
            } else {
                console.log(data.message || data.error);
            }
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    } else {
        console.log('Token not found');
    }
}

// Call loadBookmarks after defining it
loadBookmarks();


});