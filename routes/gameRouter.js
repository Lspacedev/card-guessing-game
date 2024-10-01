const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controller/gameController");

gameRouter.get("/", gameController.initializeGame);
gameRouter.get("/reset-game", gameController.resetGame);
gameRouter.get("/scores", gameController.getNickname);

gameRouter.post("/score", gameController.handleScore);

//gameRouter.get("/:cardId", gameController.handleCardClick);

module.exports = gameRouter;
