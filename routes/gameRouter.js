const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controller/gameController");

gameRouter.get("/", gameController.initializeGame);
gameRouter.get("/reset-game", gameController.resetGame);

gameRouter.get("/score", gameController.getScore);
gameRouter.post("/score", gameController.postScore);
gameRouter.get("/scores", gameController.getHighest);

module.exports = gameRouter;
