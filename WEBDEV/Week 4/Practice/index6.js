const express = require('express');
const app = express();


function isoldenoughmiddleware(req,res,next){
    const age=req.query.age;
    if(age>=14){
        next();
    }
    else {
        res.json({
            msg:"sorry"
        })
    }
}

app.get("/ride1",isoldenoughmiddleware,function(req,res){
    res.json({
        msg:"succesfully ridden one"
    })
})
app.listen(3000)