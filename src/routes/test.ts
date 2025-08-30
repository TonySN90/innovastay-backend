import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Test route is working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

router.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Test POST route is working!',
    data: req.body,
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

export default router;