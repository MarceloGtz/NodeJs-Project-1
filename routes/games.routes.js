const express = require('express');

// Controllers
const {
  getAllGames,
  createGame,
  createReview,
  assignGameToConsole,
  updateGame,
  deleteGame,
} = require('../controllers/games.controller');

// Middlewares
const {
  createGameValidators,
} = require('../middlewares/validators.middleware');
const { gameExists } = require('../middlewares/games.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.post('/reviews/:gameId', createReview);

gamesRouter.post('/assign-console', assignGameToConsole);

gamesRouter
  .use('/:id', gameExists)
  .route('/:id')
  .patch(updateGame)
  .delete(deleteGame);

module.exports = { gamesRouter };
