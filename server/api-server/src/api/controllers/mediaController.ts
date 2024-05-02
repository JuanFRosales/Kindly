import {Request, Response, NextFunction} from 'express';
import {
  deleteMedia,
  fetchAllMedia,
  fetchAllMediaByAppId,
  fetchMediaById,
  postMedia,
} from '../models/mediaModel';
import CustomError from '../../classes/CustomError';
import {MediaResponse, MessageResponse} from '@sharedTypes/MessageTypes';
import {MediaItem, TokenContent} from '@sharedTypes/DBTypes';

const mediaListGet = async (
  req: Request,
  res: Response<MediaItem[]>,
  next: NextFunction
) => {
  try {
    const media = await fetchAllMedia();
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaListGetByAppId = async (
  req: Request<{id: string}>,
  res: Response<MediaItem[]>,
  next: NextFunction
) => {
  try {
    const media = await fetchAllMediaByAppId(req.params.id);
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaGet = async (
  req: Request<{id: string}>,
  res: Response<MediaItem>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const media = await fetchMediaById(id);
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

const mediaPost = async (
  req: Request<{}, {}, Omit<MediaItem, 'media_id' | 'created_at'>>,
  res: Response<MediaResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  try {
    // add user_id to media object from token
    req.body.user_id = res.locals.user.user_id;
    console.log(req.body);
    const newMedia = await postMedia(req.body);
    if (newMedia === null) {
      const error = new CustomError('Media not created', 500);
      next(error);
      return;
    }
    res.json({message: 'Media created', media: newMedia});
  } catch (error) {
    next(error);
  }
};

const mediaDelete = async (
  req: Request<{id: string}>,
  res: Response<MessageResponse, {user: TokenContent; token: string}>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteMedia(id, res.locals.user, res.locals.token);
    if (result === null) {
      const error = new CustomError('Media not deleted', 500);
      next(error);
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {mediaListGet, mediaListGetByAppId, mediaGet, mediaPost, mediaDelete};