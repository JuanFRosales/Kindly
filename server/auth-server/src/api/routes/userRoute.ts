import express from 'express';
import {
  checkEmailExists,
  checkToken,
  checkUsernameExists,
  userDelete,
  userDeleteAsAdmin,
  userGet,
  userListGet,
  userPost,
  userPut,
  userPutAsAdmin,
} from '../controllers/userController';
import {authenticate} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

/**
 * @api {get} /users Get User List
 * @apiName GetUserList
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User's unique ID.
 * @apiSuccess {String} users.username User's username.
 * @apiSuccess {String} users.email User's email.
 * @apiSuccess {Date} users.created_at Timestamp when the user was created.
 * @apiSuccess {String} users.level_name User's level (Admin | User | Guest).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "user_id": 1,
 *         "username": "DummyUser1",
 *         "email": "dummyuser1@example.com",
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "level_name": "Admin"
 *       },
 *       {
 *         "user_id": 2,
 *         "username": "DummyUser2",
 *         "email": "dummyuser2@example.com",
 *         "created_at": "2022-02-02T00:00:00.000Z",
 *         "level_name": "User"
 *       }
 *     ]
 */
router.get('/', userListGet);

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam (Request body) {String} username Username of the User.
 * @apiParam (Request body) {String} password Password of the User.
 * @apiParam (Request body) {String} email Email of the User.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.user_id User's unique ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Date} user.created_at Timestamp when the user was created.
 * @apiSuccess {String} user.level_name User's level (Admin | User | Guest).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user created",
 *       "user": {
 *         "user_id": 1,
 *         "username": "DummyUser",
 *         "email": "dummyuser@example.com",
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "level_name": "User"
 *       }
 *     }
 */
router.post(
  '/',
  body('username').notEmpty().isString().escape().trim().isLength({min: 3}),
  body('password').notEmpty().isString().escape().trim().isLength({min: 5}),
  body('email').isEmail(),
  userPost
);

/**
 * @api {put} /users Update User
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission Bearer Token
 *
 * @apiHeader {String} Authorization Users unique access-token (Bearer Token).
 *
 * @apiParam (Request body) {Object} user User's information.
 * @apiParam (Request body) {String} [user.username] Username of the User.
 * @apiParam (Request body) {String} [user.password] Password of the User.
 * @apiParam (Request body) {String} [user.email] Email of the User.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "username": "UpdatedUser",
 *         "password": "updatedPassword",
 *         "email": "updateduser@example.com"
 *     }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.user_id User's unique ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Date} user.created_at Timestamp when the user was created.
 * @apiSuccess {String} user.level_name User's level (Admin | User | Guest).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user updated",
 *       "user": {
 *         "user_id": 5,
 *         "username": "testuser",
 *         "email": "ile@mail.fi",
 *         "created_at": "2024-01-01T19:24:37.000Z",
 *         "level_name": "User"
 *       }
 *     }
 */
router.put(
  '/',
  authenticate,
  body('username').optional().isString().escape().trim().isLength({min: 3}),
  body('password').optional().isString().escape().trim().isLength({min: 5}),
  body('email').optional().isEmail(),
  userPut
);

/**
 * @api {delete} /users Delete User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission Bearer Token
 *
 * @apiHeader {String} Authorization Users unique access-token (Bearer Token).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User's information.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user deleted",
 *       "user": {
 *         "id": 1
 *       }
 *     }
 */
router.delete('/', authenticate, userDelete);

/**
 * @api {get} /users/token Check Token / Get User Information
 * @apiName CheckToken
 * @apiGroup User
 * @apiPermission Bearer Token
 *
 * @apiHeader {String} Authorization Users unique access-token (Bearer Token).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.user_id User's unique ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Date} user.created_at Timestamp when the user was created.
 * @apiSuccess {String} user.level_name User's level (Admin | User | Guest).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Token is valid",
 *       "user": {
 *         "user_id": 1,
 *         "username": "DummyUser",
 *         "email": "dummyuser@example.com",
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "level_name": "User"
 *       }
 *     }
 */
router.get('/token', authenticate, checkToken);

/**
 * @api {get} /users/:id Get User Information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.user_id User's unique ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Date} user.created_at Timestamp when the user was created.
 * @apiSuccess {String} user.level_name User's level (Admin | User | Guest).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *         "user_id": 1,
 *         "username": "DummyUser1",
 *         "email": "dummyuser1@example.com",
 *         "created_at": "2022-01-01T00:00:00.000Z",
 *         "level_name": "Admin"
 *       }
 */
router.route('/:id').get(param('id').isNumeric(), userGet);

/**
 * @api {put} /users/:id Update User As Admin
 * @apiName UpdateUserAsAdmin
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Users unique access-token (Bearer Token).
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiParam (Request body) {Object} user User's information.
 * @apiParam (Request body) {String} [user.username] Username of the User.
 * @apiParam (Request body) {String} [user.password] Password of the User.
 * @apiParam (Request body) {String} [user.email] Email of the User.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "username": "UpdatedUser",
 *         "password": "updatedPassword",
 *         "email": "updateduser@example.com"
 *     }
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.user_id User's unique ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Date} user.created_at Timestamp when the user was created.
 * @apiSuccess {String} user.level_name User's level.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user updated",
 *       "user": {
 *         "user_id": 5,
 *         "username": "testuser",
 *         "email": "ile@mail.fi",
 *         "created_at": "2024-01-01T19:24:37.000Z",
 *         "level_name": "User"
 *       }
 *     }
 */
router
  .route('/:id')
  .put(
    authenticate,
    param('id').isNumeric(),
    body('username').optional().isString().escape().trim().isLength({min: 3}),
    body('password').optional().isString().escape().trim().isLength({min: 5}),
    body('email').optional().isEmail(),
    userPutAsAdmin
  );

/**
 * @api {delete} /users/:id Delete User as Admin
 * @apiName DeleteUserAsAdmin
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization Users unique access-token (Bearer Token).
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user User's information.
 * @apiSuccess {Number} user.id User's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "user deleted",
 *       "user": {
 *         "id": 1
 *       }
 *     }
 */
router
  .route('/:id')
  .delete(authenticate, param('id').isNumeric(), userDeleteAsAdmin);

/**
 * @api {get} /users/email Check Email
 * @apiName CheckEmail
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiParam {String} email User's email.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Boolean} exists True if email exists, false if not.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *    "available": "true"
 *  }
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *  {
 *   "message": "Invalid email"
 * }
 *
 */
router.get('/email/:email', param('email').isEmail(), checkEmailExists);

/**
 * @api {get} /users/username Check Username
 * @apiName CheckUsername
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiParam {String} username User's username.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Boolean} exists True if username exists, false if not.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *    "available": "true"
 *  }
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *  {
 *   "message": "Invalid username"
 * }
 *
 */
router.get(
  '/username/:username',
  param('username').isString().escape(),
  checkUsernameExists
);

export default router;
