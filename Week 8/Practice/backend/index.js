const express=require('express');
const app=express();
const UserRoutes=require('./routes/user');
const AdminRoutes=require('./routes/admin');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT;

app.use(express.json());
app.use('/user',UserRoutes);
app.use('/admin',AdminRoutes);

async function main(){
await mongoose.connect('mongodb+srv://ebenezerdsouza:vz9R0Rj0xNHx2IsA@cluster0.9onbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
app.listen(port);
console.log(`STARTED ON PORT ${port}`);
}

main();