const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var users=[{
    name:"ebe",
    kidneys: [{
        healthy:false
    }]
}];

app.get('/',function(req,res){
    const EbeKidneys=users[0].kidneys;
    const numberofkidneys=EbeKidneys.length;
    let numberofunhealthykidneys = EbeKidneys.filter(kidney => kidney.healthy === false).length;
    let numberofhealthykidneys=numberofkidneys-numberofunhealthykidneys;

res.json({
    numberofkidneys,
    numberofunhealthykidneys,
    numberofhealthykidneys
})
})


app.post('/',function(req,res){
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({
        msg:'done'
    })
})

app.put('/',function(req,res){
     users[0].kidneys.forEach(kidney=>{
        kidney.healthy=true;
     })
     res.json({});
})

app.delete('/',function(req,res){
    const newkidneys=[]
    users[0].kidneys.forEach(kidney=>{
        if(kidney.healthy){
             newkidneys.push({
                healthy:true
             }); 
        }
})
 users[0].kidneys=newkidneys;
 res.json({});
})
app.listen(3000)
