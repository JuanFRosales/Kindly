import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import {LoginResponse} from '@sharedTypes/MessageTypes';
import {getUserByUsername} from '../models/userModel';
import {UserWithLevel, TokenContent} from '@sharedTypes/DBTypes';
import {validationResult} from 'express-validator';

const login = async (
  req: Request<{}, {}, {username: string; password: string}>,
  res: Response<LoginResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('login validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const {username, password} = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
      next(new CustomError('Incorrect username/password', 403));
      return;
    }

    if (user.password && !bcrypt.compareSync(password, user.password)) {
      next(new CustomError('Incorrect username/password', 403));
      return;
    }

    if (!process.env.JWT_SECRET) {
      next(new CustomError('JWT secret not set', 500));
      return;
    }

    // delete user.password before sending data back to client
    const outUser: Omit<UserWithLevel, 'password'> = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      level_name: user.level_name,
    };

    const tokenContent: TokenContent = {
      user_id: user.user_id,
      level_name: user.level_name,
    };

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);

    const message: LoginResponse = {
      message: 'Login successful',
      token,
      user: outUser,
    };

    res.json(message);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {login};
