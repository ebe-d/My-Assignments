const express=require('express');
const app=express();
const CourseRoute=require('../backend/routes/courses');
const UserRoute=require('./routes/user');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/',CourseRoute,UserRoute);

app.listen(port);