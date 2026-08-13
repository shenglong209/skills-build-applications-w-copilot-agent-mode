import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(connectionString);

  const collections = ['users', 'teams', 'activities', 'leaderboards', 'workouts'];
  for (const collection of collections) {
    await mongoose.connection.db?.dropCollection(collection).catch(() => undefined);
  }

  const users = await User.insertMany([
    {
      name: 'Ava Thompson',
      email: 'ava.thompson@example.com',
      passwordHash: 'hash-ava',
      fitnessLevel: 'advanced',
      goals: ['Half marathon', 'Strength gains'],
      teamId: null,
    },
    {
      name: 'Marcus Chen',
      email: 'marcus.chen@example.com',
      passwordHash: 'hash-marcus',
      fitnessLevel: 'intermediate',
      goals: ['Improve endurance', 'Daily mobility'],
      teamId: null,
    },
    {
      name: 'Priya Shah',
      email: 'priya.shah@example.com',
      passwordHash: 'hash-priya',
      fitnessLevel: 'beginner',
      goals: ['Walk more often', 'Core strength'],
      teamId: null,
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@example.com',
      passwordHash: 'hash-jordan',
      fitnessLevel: 'advanced',
      goals: ['Cycling race prep', 'Recovery'],
      teamId: null,
    },
  ]);

  const teamOne = await Team.create({
    name: 'Velocity Squad',
    sport: 'Running',
    captainId: users[0]._id,
    members: [users[0]._id, users[1]._id],
  });

  const teamTwo = await Team.create({
    name: 'Peak Pursuit',
    sport: 'Cross-training',
    captainId: users[2]._id,
    members: [users[2]._id, users[3]._id],
  });

  await User.updateMany(
    { _id: { $in: [users[0]._id, users[1]._id] } },
    { $set: { teamId: teamOne._id } },
  );

  await User.updateMany(
    { _id: { $in: [users[2]._id, users[3]._id] } },
    { $set: { teamId: teamTwo._id } },
  );

  await Activity.insertMany([
    {
      userId: users[0]._id,
      type: 'Run',
      durationMinutes: 42,
      distanceKm: 8.4,
      caloriesBurned: 420,
      date: new Date('2026-08-10T06:30:00Z'),
      notes: 'Tempo run along the river path',
    },
    {
      userId: users[1]._id,
      type: 'Strength',
      durationMinutes: 50,
      caloriesBurned: 340,
      date: new Date('2026-08-11T18:00:00Z'),
      notes: 'Upper body and core circuit',
    },
    {
      userId: users[2]._id,
      type: 'Walk',
      durationMinutes: 35,
      distanceKm: 3.2,
      caloriesBurned: 180,
      date: new Date('2026-08-12T08:10:00Z'),
      notes: 'Recovery walk through the park',
    },
    {
      userId: users[3]._id,
      type: 'Cycle',
      durationMinutes: 60,
      distanceKm: 24,
      caloriesBurned: 610,
      date: new Date('2026-08-12T17:45:00Z'),
      notes: 'Interval training ride',
    },
  ]);

  await Leaderboard.insertMany([
    {
      userId: users[0]._id,
      name: 'Ava Thompson',
      teamName: 'Velocity Squad',
      points: 980,
      rank: 1,
      streak: 14,
    },
    {
      userId: users[3]._id,
      name: 'Jordan Lee',
      teamName: 'Peak Pursuit',
      points: 942,
      rank: 2,
      streak: 9,
    },
    {
      userId: users[1]._id,
      name: 'Marcus Chen',
      teamName: 'Velocity Squad',
      points: 891,
      rank: 3,
      streak: 7,
    },
    {
      userId: users[2]._id,
      name: 'Priya Shah',
      teamName: 'Peak Pursuit',
      points: 823,
      rank: 4,
      streak: 5,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Sprint Intervals',
      type: 'Running',
      durationMinutes: 30,
      difficulty: 'advanced',
      equipment: ['Spikes', 'Stopwatch'],
      focus: 'Speed and power',
    },
    {
      title: 'Full Body Circuit',
      type: 'Strength',
      durationMinutes: 40,
      difficulty: 'moderate',
      equipment: ['Dumbbells', 'Mat'],
      focus: 'Strength endurance',
    },
    {
      title: 'Mobility Reset',
      type: 'Recovery',
      durationMinutes: 20,
      difficulty: 'easy',
      equipment: ['Yoga mat'],
      focus: 'Mobility and flexibility',
    },
    {
      title: 'Stationary Bike Blast',
      type: 'Cycling',
      durationMinutes: 45,
      difficulty: 'moderate',
      equipment: ['Bike'],
      focus: 'Cardio conditioning',
    },
  ]);

  console.log('Database seeding complete');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
