import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.json({ message: 'Users endpoint', users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
});

export default router;
