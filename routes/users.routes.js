const express = require('express');

// Controllers
const {
  getAllOrders,
  getOrder,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/users.controller');

// Middlewares
const {
  createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
  protectSession,
  protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

// Protected with JWT
usersRouter.use(protectSession);

usersRouter.get('/orders', getAllOrders);
usersRouter.get('/orders/:id', getOrder);

usersRouter
  .use('/:id', userExists)
  .route('/:id')
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
