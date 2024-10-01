const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controller/gameController");

gameRouter.get("/", gameController.initializeGame);
gameRouter.get("/:cardId", gameController.handleCardClick);

module.exports = gameRouter;
