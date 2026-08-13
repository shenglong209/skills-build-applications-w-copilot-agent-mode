import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email').sort({ date: -1 });
    res.json({ message: 'Activities endpoint', activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity logged', activity });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create activity', error });
  }
});

export default router;
