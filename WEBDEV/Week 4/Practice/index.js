

const fs=require('fs');
const {Command} = require("commander");

const program=new Command();

program.name('Gino')
.description('Ginti se related tool hai')
.version('underdev');

program.command('gin')
.argument('<file>','filekanaam')
.description('lines ginta hai files ke')
.action((file)=>{
    fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
            console.log("error aaya bhai firse dekhlo kya galti hai")
        }
        else{
            const lines=data.split('\n').length;
            console.log(`iss ${file} me ${lines} lines hai`)
        }
    })
})
program.parse();