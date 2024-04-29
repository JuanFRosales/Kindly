/* eslint-disable node/no-unpublished-import */
import app from '../src/app';
import {UserWithLevel} from '@sharedTypes/DBTypes';
import {getFound, getNotFound} from './serverFunction';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getSingleUserError,
  login,
  modifyUser,
} from './userFunction';
import randomstring from 'randomstring';

const userpath = '/api/v1/users';
const loginpath = '/api/v1/auth/login';

describe('GET /api/v1', () => {
  // test that server is running
  it('should return 200 OK', async () => {
    await getFound(app, '/');
  });

  // test that you get 404 Not Found
  it('should return 404 Not Found', async () => {
    await getNotFound(app, '/something');
  });

  // test user
  const testuser: Pick<UserWithLevel, 'username' | 'email' | 'password'> = {
    username: 'testuser' + randomstring.generate(5),
    email: randomstring.generate(5) + '@test.com',
    password: 'testpassword',
  };

  // create a user
  let user: UserWithLevel;
  it('should create a user', async () => {
    user = await createUser(app, userpath, testuser);
  });

  // test that you get all users
  it('should return all users', async () => {
    const users = await getAllUsers(app, userpath);
    expect(users.length).toBeGreaterThan(0);
  });

  // test that you get a single user
  it('should return a single user', async () => {
    await getSingleUser(app, userpath, user.user_id);
  });

  // test login
  let token: string;
  it('should login', async () => {
    token = await login(app, loginpath, testuser);
  });

  // test modify user
  const modifieduser: Pick<UserWithLevel, 'username' | 'email'> = {
    username: 'modifieduser' + randomstring.generate(5),
    email: randomstring.generate(5) + '@test.com',
  };
  it('should modify a user', async () => {
    console.log('Token', token);
    const bearerToken = `Bearer ${token}`;
    await modifyUser(app, userpath, bearerToken, modifieduser);
  });

  // test delete user
  it('should delete a user', async () => {
    const bearerToken = `Bearer ${token}`;
    await deleteUser(app, userpath, bearerToken);
  });

  // test that the user is deleted
  it('should not find the user', async () => {
    await getSingleUserError(app, userpath, user.user_id);
  });
});
