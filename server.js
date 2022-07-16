const dotenv = require('dotenv');
const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Meal } = require('./models/meal.model');

// Utils
const { db } = require('./utils/database.util');

dotenv.config({ path: './config.env' });

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch(err => console.log(err));

// Establish model's relations

// 1 User <----> M Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

// 1 User <----> M Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

// 1 Restaurant <----> M Review
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

// 1 Restaurant <----> M Meal
Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);

// 1 Meal <----> M Order
Meal.hasMany(Order, { foreignKey: 'mealId' });
Order.belongsTo(Meal);

db.sync()
  .then(() => console.log('Db synced'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log('Express app running!!');
});
