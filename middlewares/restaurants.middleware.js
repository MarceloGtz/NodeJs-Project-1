// Models
const { Restaurant } = require('../models/restaurant.model');
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});

const isAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const admin = await User.findOne({ where: { id } });

  if (!admin.role === 'admin') {
    return next(
      new AppError(
        'You cannot update data because you are NOT an administrator',
        400
      )
    );
  }
  next();
});

module.exports = { restaurantExists, isAdmin };
