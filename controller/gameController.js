const fs = require("fs");
let cardArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
];
function randomIndex(min, max) {
  let arr = [];
  while (arr.length < 36) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    }
  }

  return arr;
}
function initializeGame(req, res) {
  let indexArr = randomIndex(0, 35);
  let cards = [];
  indexArr.forEach((i) => {
    cards.push(cardArr[i]);
  });

  res.render("index", { cards: cards });
}
function handleCardClick(req, res) {
  const { cardId } = req.params;

  // res.render("index", { cards: cardArr });
}
function resetGame(req, res) {
  res.redirect("/");
}
function getScore(req, res) {
  fs.readFile("./db/scores.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    res.json(jsonString);
  });
}
function postScore(req, res) {
  fs.readFile("./db/scores.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    const data = JSON.parse(jsonString);
    let obj = { ...req.body };

    fs.writeFile("./db/scores.json", JSON.stringify(obj), (err) => {
      if (err) {
        console.error("Error writing file", err);
        res.end();
      } else {
        res.send("success");
      }
    });
  });
}
function getHighest(req, res) {
  fs.readFile("./db/scores.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    const score = JSON.parse(jsonString);

    res.render("scores", { score: score });
  });
}
module.exports = {
  initializeGame,
  resetGame,
  getScore,
  postScore,
  getHighest,
};
