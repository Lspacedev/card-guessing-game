let clickArr = [];
let score = 0;
const scoreDiv = document.querySelector(".score");
scoreDiv.innerText = score;
//loop through all cards and add event listener
const cards = document.querySelectorAll(".card");
let startTime = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
const hoursDiv = document.querySelector(".hours");
const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");
let isDone = false;
let i = 0;
const timer = setInterval(() => {
  if (seconds === 59) {
    if (minutes === 59) {
      hoursDiv.innerText = hours++ + "hr";
      minutes = 0;
    } else {
      minutesDiv.innerText = minutes++ + "min";
      seconds = 0;
    }
  } else {
    secondsDiv.innerText = seconds++ + "sec";
  }
}, 1000);
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (score === 1) {
      hoursDiv.innerText = 0;
      minutesDiv.innerText = 0;
      secondsDiv.innerText = 0;
      clearInterval(timer);
      try {
        let data = JSON.stringify({
          hr: hours,
          min: minutes,
          sec: seconds,
        });
        fetch("http://localhost:3000/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }).then((res) => {
          console.log(res.json());
        });
      } catch (err) {
        console.log(err);
      }
    }

    //if 2 or more divs are clicked at time return
    if (clickArr.length === 2) {
      return;
    }

    //find the card's id and letter
    const card = e.currentTarget;

    const id = Number(card.id);

    const letter = card.querySelector(".back").innerText;

    //check if clicked card exists in array, if not add it
    const cardExists = clickArr.filter((arr) => arr[0] === id);

    if (cardExists.length === 0) {
      clickArr.push([id, letter]);
    }

    //select card container and add flipped class to create flipped effect
    const cardContainer = card.querySelector(".card-container");
    cardContainer.classList.add("flipped");

    //if two cards are clicked, check if the letters match
    //if the first card clicked is equal to the current letter, clear array

    if (clickArr.length === 2) {
      if (clickArr[0][1] == letter) {
        clickArr = [];
        //update score

        scoreDiv.innerText = ++score;
      } else {
        //if cards'letters don't match, remove flipped class from the card container after 1 second
        setTimeout(() => {
          //select first card's id from the clickArr
          const prevId = clickArr[0][0];

          //remove flipped class from the first card
          cards[prevId]
            .querySelector(".card-container")
            .classList.remove("flipped");

          //remove flipped class from the current card
          cardContainer.classList.remove("flipped");

          //clear the clickArr to resume clicking
          clickArr = [];
        }, 1000);
      }
    }
  });
});
