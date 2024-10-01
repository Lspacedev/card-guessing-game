let cardArr = [
  { letter: "A", state: "n" },
  { letter: "B", state: "n" },
  { letter: "C", state: "n" },
  { letter: "D", state: "n" },
  { letter: "E", state: "n" },
  { letter: "F", state: "n" },
  { letter: "G", state: "n" },
  { letter: "H", state: "n" },
  { letter: "I", state: "n" },
  { letter: "J", state: "n" },
  { letter: "K", state: "n" },
  { letter: "L", state: "n" },
  { letter: "M", state: "n" },
  { letter: "N", state: "n" },
  { letter: "O", state: "n" },
  { letter: "P", state: "n" },
];
function initializeGame(req, res) {
  res.render("index", { cards: cardArr, state: "" });
}
function handleCardClick(req, res) {
  const { cardId } = req.params;

  console.log(cardArr[cardId]);

  //cardArr[Number(cardId)].state = "f";

  //res.redirect("/");
}

module.exports = { initializeGame, handleCardClick };
