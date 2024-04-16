// Description: This file contains the functions for the user routes

import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcryptjs';
import {UserDeleteResponse, UserResponse} from '@sharedTypes/MessageTypes';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  modifyUser,
} from '../models/userModel';
import {TokenContent, User, UserWithNoPassword} from '@sharedTypes/DBTypes';
import {validationResult} from 'express-validator';

const salt = bcrypt.genSaltSync(12);

const userListGet = async (
  req: Request,
  res: Response<UserWithNoPassword[]>,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();

    if (users === null) {
      next(new CustomError('Users not found', 404));
      return;
    }
    res.json(users);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const userGet = async (
  req: Request<{id: number}>,
  res: Response<UserWithNoPassword>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('userGet validation', messages);
    next(new CustomError(messages, 400));
    return;
  }
  try {
    const user = await getUserById(req.params.id);
    if (user === null) {
      next(new CustomError('User not found', 404));
      return;
    }
    res.json(user);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const userPost = async (
  req: Request<{}, {}, User>,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('userPost validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, salt);

    console.log(user);

    const newUser = await createUser(user);
    console.log('newUser', newUser);
    if (!newUser) {
      next(new CustomError('User not created', 500));
      return;
    }
    const response: UserResponse = {
      message: 'user created',
      user: newUser,
    };
    res.json(response);
  } catch (error) {
    next(new CustomError('Duplicate entry', 200));
  }
};

const userPut = async (
  req: Request<{}, {}, User>,
  res: Response<UserResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('userPut validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const userFromToken = res.locals.user;

    const user = req.body;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    console.log('userPut', userFromToken, user);

    const result = await modifyUser(user, userFromToken.user_id);

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    console.log('put result', result);

    const response: UserResponse = {
      message: 'user updated',
      user: result,
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const userDelete = async (
  req: Request,
  res: Response<UserDeleteResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  try {
    const userFromToken = res.locals.user;
    console.log('user from token', userFromToken);

    const result = await deleteUser(userFromToken.user_id);

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    res.json(result);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const userPutAsAdmin = async (
  req: Request<{id: string}, {}, User>,
  res: Response<UserResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('userPutAsAdmin validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    if (res.locals.user.level_name !== 'Admin') {
      next(new CustomError('You are not authorized to do this', 401));
      return;
    }
    const user = req.body;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result = await modifyUser(user, Number(req.params.id));

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: UserResponse = {
      message: 'user updated',
      user: result,
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const userDeleteAsAdmin = async (
  req: Request<{id: string}>,
  res: Response<UserDeleteResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('userDeleteAsAdmin validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    if (res.locals.user.level_name !== 'Admin') {
      next(new CustomError('You are not authorized to do this', 401));
      return;
    }

    const result = await deleteUser(Number(req.params.id));

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    res.json(result);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const checkToken = async (
  req: Request,
  res: Response<UserResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  const userFromToken = res.locals.user;
  // check if user exists in database
  const user = await getUserById(userFromToken.user_id);
  if (!user) {
    next(new CustomError('User not found', 404));
    return;
  }

  const message: UserResponse = {
    message: 'Token is valid',
    user: user,
  };
  res.json(message);
};

const checkEmailExists = async (
  req: Request<{email: string}>,
  res: Response<{available: boolean}>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('checkEmailExists validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const user = await getUserByEmail(req.params.email);
    console.log(user);
    res.json({available: user ? false : true});
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const checkUsernameExists = async (
  req: Request<{username: string}>,
  res: Response<{available: boolean}>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('checkUsernameExists validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const user = await getUserByUsername(req.params.username);
    res.json({available: user ? false : true});
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  userListGet,
  userGet,
  userPost,
  userPut,
  userDelete,
  userPutAsAdmin,
  userDeleteAsAdmin,
  checkToken,
  checkEmailExists,
  checkUsernameExists,
};
