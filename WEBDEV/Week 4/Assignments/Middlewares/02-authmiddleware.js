

const express = require('express');
const app = express();
const VALID_API_KEY = '100xdevs_cohort3_super_secret_valid_api_key';



function authenticateAPIKey(req, res, next) {
    
    const actualkey=req.header('API');

    if(!actualkey){
        return res.status(401).json({message:'Invalid or missing API key'})
    }
    if (actualkey===VALID_API_KEY){
        return next();
    }
    else{
        return res.status(401).json({message:'Invalid or missing API key'})
    }
}

app.use(authenticateAPIKey);

app.get('/',(req, res) => {
    res.status(200).json({ message: 'Access granted' });
});

app.listen(3000);
module.exports = app;