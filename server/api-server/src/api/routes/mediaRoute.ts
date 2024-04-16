/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import express from 'express';
import {
  mediaDelete,
  mediaGet,
  mediaListGet,
  mediaListGetByAppId,
  mediaPost,
} from '../controllers/mediaController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(mediaListGet).post(authenticate, mediaPost);

router.route('/:id').get(mediaGet).delete(authenticate, mediaDelete);

router.route('/app/:id').get(mediaListGetByAppId);

export default router;