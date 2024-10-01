const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controller/gameController");

gameRouter.get("/", gameController.initializeGame);

module.exports = gameRouter;
