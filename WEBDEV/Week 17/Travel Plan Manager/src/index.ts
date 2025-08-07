import { Client } from 'pg';
import { DB_URL } from './config';
import { createTables, dropTables } from './db/setup';

export const pg = new Client({
    connectionString:DB_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

async function InitialiseDB(){

    try{
        await pg.connect();
       
        console.log('DB connected');
        createTables();
    }
    catch(e){
        console.log(e);   
    }

}

InitialiseDB();
