import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('captainId', 'name email')
      .populate('members', 'name email')
      .sort({ createdAt: 1 });

    res.json({ message: 'Teams endpoint', teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team', error });
  }
});

export default router;
