const express = require('express');

// Controllers
const {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
} = require('../controllers/consoles.controller');

// Middlewares
const {
  createConsoleValidators,
} = require('../middlewares/validators.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter.post('/', createConsoleValidators, createConsole);

consolesRouter
  .use('/:id', consoleExists)
  .route('/:id')
  .patch(updateConsole)
  .delete(deleteConsole);

module.exports = { consolesRouter };
