const dotenv = require('dotenv');

// Models
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    restaurants,
  });
});

const getRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.find({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newRestaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  if (!restaurant.role === 'admin') {
    return next(
      new AppError(
        'You cannot update data because you are NOT an administrator',
        400
      )
    );
  }

  await restaurant.update({ name, address });

  res.status(204).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  // await user.destroy();
  await restaurant.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
