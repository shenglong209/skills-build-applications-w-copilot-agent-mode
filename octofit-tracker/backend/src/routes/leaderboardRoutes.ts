import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1, rank: 1 });
    res.json({ message: 'Leaderboard endpoint', leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;
