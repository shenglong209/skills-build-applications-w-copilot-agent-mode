import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: 1 });
    res.json({ message: 'Workouts endpoint', workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ message: 'Workout suggestion created', workout });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout', error });
  }
});

export default router;
