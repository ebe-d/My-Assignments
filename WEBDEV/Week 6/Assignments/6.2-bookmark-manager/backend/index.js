const express=require('express');
const app=express();
const routesOf=require('../backend/routes/user')
const RoutesOF=require('../backend/routes/bookmarks')
const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use('/',routesOf,RoutesOF);

app.listen(3000);