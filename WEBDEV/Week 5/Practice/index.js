const express=require('express')
const app=express()

app.get('/add/:a/:b',function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    const result=a+b;
    res.send(result.toString());
})

app.listen(3000); 