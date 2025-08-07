import { pg } from "../index.js";

export const createTables = async () => {
    const userTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const travelTableQuery = `
        CREATE TABLE IF NOT EXISTS travel (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            title VARCHAR(50) NOT NULL,
            destination_city VARCHAR(50) NOT NULL,
            destination_country VARCHAR(50) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            budget INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `;

    try {
        await pg.query('BEGIN');
        await pg.query(userTableQuery);
        await pg.query(travelTableQuery);
        await pg.query('COMMIT');
        console.log("Tables created successfully");
    } catch (e) {
        await pg.query('ROLLBACK');
        console.error('Error creating tables:', e);
        throw e;
    }
}

export const dropTables = async () => {
    // Drop tables in reverse order of dependency
    const dropTravelTable = 'DROP TABLE IF EXISTS travel CASCADE;';
    const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';

    try {
        await pg.query('BEGIN');
        await pg.query(dropTravelTable);
        await pg.query(dropUsersTable);
        await pg.query('COMMIT');
        console.log("Tables dropped successfully");
    } catch (e) {
        await pg.query('ROLLBACK');
        console.error('Error dropping tables:', e);
        throw e;
    }
}