const express = require('express');

// Controllers
const {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurants.controller');

// Middlewares
const {
  createUserValidators,
  createRestaurantValidators,
} = require('../middlewares/validators.middleware');
const {
  restaurantExists,
  isAdmin,
} = require('../middlewares/restaurants.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);

// Protected with JWT
restaurantsRouter.use(protectSession);

restaurantsRouter.get('/', getAllRestaurants);
restaurantsRouter.get('/orders/:id', getOrder);

restaurantsRouter
  .use('/:id', restaurantExists)
  .route('/:id')
  .get(getRestaurant)
  .patch(isAdmin, updateRestaurant)
  .delete(isAdmin, deleteRestaurant);

module.exports = { restaurantsRouter };
