import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import activityRoutes from './routes/activityRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import workoutRoutes from './routes/workoutRoutes';

const app: Express = express();
const PORT = Number(process.env.PORT ?? 8000);

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:8000'];

  if (origin && (origin.includes('.app.github.dev') || allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Octofit Tracker API is running',
    apiBaseUrl,
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Octofit Tracker API',
    version: '1.0.0',
    apiBaseUrl,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`✓ Server running on ${apiBaseUrl}`);
      console.log(`✓ Frontend will run on http://localhost:5173`);
      console.log(`✓ MongoDB listening on ${MONGODB_URI}`);
    });
  })
  .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  });
