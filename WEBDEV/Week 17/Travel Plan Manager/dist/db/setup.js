import { pg } from "../index.js";
export const createTables = async () => {
    const query = 'CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(50) UNIQUE NOT NULL,password VARCHAR(50) NOT NULL,email VARCHAR(50) NOT NULL);';
    const query2 = 'CREATE TABLE travel (id SERIAL PRIMARY KEY,user_id INTEGER NOT NULL,title VARCHAR(50) NOT NULL,destination_city VARCHAR(50) NOT NULL,destination_country VARCHAR(50) NOT NULL,start_date DATE NOT NULL,end_date DATE NOT NULL,budget INTEGER);';
    try {
        await pg.query('BEGIN');
        const response = await pg.query(query);
        const response2 = await pg.query(query2);
        console.log("tables created");
        await pg.query('COMMIT');
    }
    catch (e) {
        await pg.query('ROLLBACK');
        console.log(e);
    }
};
export const dropTables = async () => {
    const query = 'DROP TABLE users;';
    const query2 = 'DROP TABLE travel;';
    try {
        await pg.query('BEGIN');
        const response = await pg.query(query);
        const response2 = await pg.query(query2);
        console.log("tables deleted");
        await pg.query('COMMIT');
    }
    catch (e) {
        await pg.query('ROLLBACK');
        console.log(e);
    }
};
//# sourceMappingURL=setup.js.map