import { Client } from 'pg';
import { DB_URL } from './config.js';
import { createTables, dropTables } from './db/setup.js';
export const pg = new Client({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
async function InitialiseDB() {
    try {
        await pg.connect();
        console.log('DB connected');
        createTables();
    }
    catch (e) {
        console.log(e);
    }
}
InitialiseDB();
//# sourceMappingURL=index.js.map