function initializeGame(req, res) {
  res.render("index");
}
function handleCardClick(req, res) {
  const { cardId } = req.params;

  console.log(cardArr[cardId]);

  //cardArr[Number(cardId)].state = "f";

  //res.redirect("/");
}

module.exports = { initializeGame, handleCardClick };
