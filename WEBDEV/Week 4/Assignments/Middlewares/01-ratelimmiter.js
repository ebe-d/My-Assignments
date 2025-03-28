

const express = require('express');
const app = express();

let numberOfRequestsForUser = {};

let resetInterval;

app.use((req,res,next)=>{
    const UserID=req.header('user-id');

if(!UserID){
    return res.status(400).json({error:'id required'})
}

const currentTime=Math.floor(Date.now()/1000);

if(!numberOfRequestsForUser[UserID]){
    numberOfRequestsForUser[UserID]={count:0,lastRequestTime:currentTime};
}

const userData=numberOfRequestsForUser[UserID];

if(currentTime===userData.lastRequestTime){
    userData.count+=1;
}
else {
    userData.count=1;
    userData.lastRequestTime=currentTime;
}
if(userData.count>5){
    return res.status(404).json({error:'too many reqs'})
}
next();
})


resetInterval=setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)


app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.resetInterval=resetInterval;
module.exports = app;

app.listen(3000)