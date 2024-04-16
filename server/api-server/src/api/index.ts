/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import express, {Request, Response} from 'express';

import mediaRoute from './routes/mediaRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'media api v1',
  });
});

router.use('/media', mediaRoute);

export default router;