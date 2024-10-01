const fs = require("fs");
let cardArr = [
  { letter: "A", state: "n" },
  { letter: "B", state: "n" },
  { letter: "C", state: "n" },
  { letter: "D", state: "n" },
  { letter: "E", state: "n" },
  { letter: "F", state: "n" },
  { letter: "G", state: "n" },
  { letter: "H", state: "n" },
  { letter: "A", state: "n" },
  { letter: "B", state: "n" },
  { letter: "C", state: "n" },
  { letter: "D", state: "n" },
  { letter: "E", state: "n" },
  { letter: "F", state: "n" },
  { letter: "G", state: "n" },
  { letter: "H", state: "n" },
];
function randomIndex(min, max) {
  let arr = [];
  while (arr.length < 16) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    }
  }

  return arr;
}
function initializeGame(req, res) {
  let indexArr = randomIndex(0, 15);
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
function handleScore(req, res) {
  let isLowest = false;
  fs.readFile("./db/scores.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }
    const data = JSON.parse(jsonString);
    const lowestTime = data.time;
    if (lowestTime.hr > req.body.hr) {
      isLowest = true;
    }
    if (lowestTime.min > req.body.min) {
      isLowest = true;
    }
    if (lowestTime.sec > req.body.sec) {
      isLowest = true;
    }
    if (isLowest) {
      console.log(data);
      let obj = { ...data, time: req.body };

      fs.writeFile("./db/scores.json", JSON.stringify(obj), (err) => {
        if (err) {
          console.error("Error writing file", err);
          res.end();
        } else {
          res.redirect("/score");
        }
      });
    }
  });
  //res.redirect("/scores");
}

function getNickname(req, res) {
  res.render("scores");
}
module.exports = { initializeGame, resetGame, handleScore, getNickname };
