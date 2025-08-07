import { Client } from 'pg';
import { createTables, dropTables } from "../setup.js";
import { createTravelPlan, getTravelPlans, updateTravelPlan } from "../travel.js";
import { createUser, getUser } from "../user.js";
import { pg } from "../../index.js";

// Use a single connection for all tests
let testUserId: number;
let testDbClient: Client;

beforeAll(async () => {
    // Create a new client for tests
    testDbClient = new Client({
        connectionString: process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/travel_planner_test',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        // Set statement_timeout to fail fast if something goes wrong
        statement_timeout: 5000
    });
    
    try {
        await testDbClient.connect();
        
        // Set the global pg client to our test client
        Object.defineProperty(global, 'pg', {
            value: { 
                query: testDbClient.query.bind(testDbClient),
                end: () => Promise.resolve() // Mock the end method to prevent actual closing during tests
            },
            writable: false
        });
        
        // Drop and recreate tables
        await dropTables();
        await createTables();
    } catch (error) {
        console.error('Error in beforeAll:', error);
        throw error;
    }
});

afterEach(async () => {
    // Clean up data between tests
    try {
        await testDbClient.query('TRUNCATE TABLE travel CASCADE');
        await testDbClient.query('TRUNCATE TABLE users CASCADE');
    } catch (error) {
        console.error('Error in afterEach cleanup:', error);
    }
});

afterAll(async () => {
    try {
        // Clean up all test data
        await dropTables();
        
        // Close the database connection
        if (testDbClient) {
            await testDbClient.end().catch(error => {
                console.error('Error closing database connection:', error);
            });
        }
    } catch (error) {
        console.error('Error in afterAll cleanup:', error);
    }
});

describe('User DB ops', () => {
    test('createUser', async () => {
        const newUser = {
            name: 'testuser',
            email: 'test@test.com',
            password: 'password123'
        };
        
        const userId = await createUser(newUser);
        testUserId = userId; // Store the user ID for other tests
        
        expect(typeof userId).toBe('number');
        expect(userId).toBeGreaterThan(0);
    });

    test('getUser', async () => {
        const user = await getUser(testUserId);
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user.email).toBe('test@test.com');
    });
});

describe('Travel ops', () => {
    let travelPlanId: number;
    
    test('createTravelPlan', async () => {
        const travelPlan = {
            title: 'Test Trip',
            destination_city: 'Test City',
            destination_country: 'Test Country',
            start_date: '2023-01-01',
            end_date: '2023-01-10',
            budget: 1000
        };
        
        // createTravelPlan returns a Promise<number>
        const planId = await createTravelPlan(testUserId, travelPlan);
        travelPlanId = planId;
        
        expect(typeof planId).toBe('number');
        expect(planId).toBeGreaterThan(0);
    });

    test('updateTravelPlan', async () => {
        const updatedPlan = await updateTravelPlan(
            travelPlanId,
            'title',
            'Updated Trip Title'
        );
        
        expect(updatedPlan).toHaveProperty('id', travelPlanId);
        expect(updatedPlan.title).toBe('Updated Trip Title');
    });

    test('getTravelPlans', async () => {
        const travelPlans = await getTravelPlans(travelPlanId);
        
        expect(Array.isArray(travelPlans)).toBe(true);
        expect(travelPlans.length).toBeGreaterThan(0);
        
        const plan = travelPlans[0];
        expect(plan).toHaveProperty('id');
        expect(plan).toHaveProperty('user_id');
        expect(plan).toHaveProperty('title');
        expect(plan).toHaveProperty('destination_city');
        expect(plan).toHaveProperty('destination_country');
        expect(plan).toHaveProperty('start_date');
        expect(plan).toHaveProperty('end_date');
    });
});


