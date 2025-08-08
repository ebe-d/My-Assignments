import { PrismaClient } from '@prisma/client';
import { createUser, getUser } from '../user';
import { createTravelPlan, updateTravelPlan, getTravelPlans } from '../travelPlan';
import { dropTables } from '../setup';

const prisma = new PrismaClient();

beforeAll(async () => {
  await dropTables();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Database Operations', () => {
  test('createUser inserts a new user into the database', async () => {
    const user = await createUser({
      username: 'testuser',
      password: 'testpass',
      email: 'testuser@example.com'
    });

    expect(user).toHaveProperty('username', 'testuser');
    expect(user).toHaveProperty('email', 'testuser@example.com');
  });

  test('getUser retrieves a user by ID', async () => {
    const newUser = await createUser({
      username: 'newuser',
      password: 'password',
      email: 'newuser@example.com'
    });

    const user = await getUser(newUser.id);

    expect(user).toHaveProperty('username', 'newuser');
    expect(user).toHaveProperty('email', 'newuser@example.com');
  });
});

describe('TravelPlan Operations', () => {
  let userId: number;
  let username = 'traveluser';

  beforeAll(async () => {
    const user = await createUser({
      username,
      password: 'password',
      email: 'traveluser@example.com'
    });
    userId = user.id; // ✅ store this for later use
  });

  test('createTravelPlan inserts a new travel plan for a user', async () => {
    const travelPlan = await createTravelPlan(userId, {
      title: 'Beach Vacation',
      destination_city: 'Goa',
      destination_country: 'India',
      start_date: '2024-12-20',
      end_date: '2024-12-30',
      budget: 1000,
      id: 0, // not used during creation
      userId: userId
    });

    expect(travelPlan).toHaveProperty('title', 'Beach Vacation');
    expect(travelPlan).toHaveProperty('destinationCity', 'Goa');
    expect(travelPlan).toHaveProperty('destinationCountry', 'India');
    expect(travelPlan).toHaveProperty('budget', 1000);
  });

  test('updateTravelPlan updates the title and/or budget of a travel plan', async () => {
    const initialPlan = await createTravelPlan(userId, {
      title: 'Old Plan',
      destination_city: 'Paris',
      destination_country: 'France',
      start_date: '2024-06-01',
      end_date: '2024-06-15',
      budget: 1500,
      id: 0,
      userId: userId
    });

    const updatedPlan = await updateTravelPlan(initialPlan.id, 'Updated Plan', 2000);

    expect(updatedPlan).toHaveProperty('title', 'Updated Plan');
    expect(updatedPlan).toHaveProperty('budget', 2000);
  });

  test('getTravelPlans retrieves all travel plans for a user', async () => {
    await createTravelPlan(userId, {
      title: 'Mountain Hike',
      destination_city: 'Shimla',
      destination_country: 'India',
      start_date: '2025-01-10',
      end_date: '2025-01-20',
      budget: 800,
      id: 0,
      userId: userId
    });

    const travelPlans = await getTravelPlans(userId);

    expect(travelPlans.length).toBeGreaterThan(0);
    travelPlans.forEach((plan: any) => {
      expect(plan).toHaveProperty('userId', userId);
      expect(plan).toHaveProperty('title');
      expect(plan).toHaveProperty('destinationCity');
    });
  });
});

