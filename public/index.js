let clickArr = [];
let score = 0;

const cards = document.querySelectorAll(".card");
let startTime = 0;
let seconds = 1;
let minutes = 0;
let hours = 0;
const hoursDiv = document.querySelector(".hours");
const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");
let isDone = false;
let i = 0;
const timer = setInterval(() => {
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    minutesDiv.innerText = minutes < 10 ? "0" + minutes : minutes;
  }
  if (minutes == 60) {
    minutes = 0;
    minutesDiv.innerText = "00";
    hours++;
    hoursDiv.innerText = hours < 10 ? "0" + hours : hours;
  }
  secondsDiv.innerText = seconds < 10 ? "0" + seconds++ : seconds++;
}, 1000);
cards.forEach((card) => {
  card.addEventListener("click", async (e) => {
    if (score === 18) {
      hoursDiv.innerText = 0;
      minutesDiv.innerText = 0;
      secondsDiv.innerText = 0;
      clearInterval(timer);
      try {
        const res = await fetch("http://localhost:3000/score");
        let data = await res.json();
        data = JSON.parse(data);
        let isLowest = false;

        const lowestTime = data.time;

        if (lowestTime.hr > hours) {
          isLowest = true;
        }
        if (lowestTime.min > minutes) {
          isLowest = true;
        }
        if (lowestTime.sec > seconds) {
          isLowest = true;
        }
        if (isLowest) {
          let nickname = prompt(
            "You beat the highest score! Enter your nickname"
          );

          if (nickname !== "") {
            let data = JSON.stringify({
              nickname: nickname,
              time: {
                hr: hours,
                min: minutes,
                sec: seconds,
              },
            });

            fetch("http://localhost:3000/score", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: data,
            }).then((res) => {
              console.log(res.json());
              window.location.assign("http://localhost:3000/scores");
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (clickArr.length === 2) {
      return;
    }

    const card = e.currentTarget;

    const id = Number(card.id);

    const letter = card.querySelector(".back").innerText;

    const cardExists = clickArr.filter((arr) => arr[0] === id);

    if (cardExists.length === 0) {
      clickArr.push([id, letter]);
    }

    const cardContainer = card.querySelector(".card-container");
    cardContainer.classList.add("flipped");

    if (clickArr.length === 2) {
      if (clickArr[0][1] == letter) {
        clickArr = [];

        ++score;
      } else {
        setTimeout(() => {
          const prevId = clickArr[0][0];

          cards[prevId]
            .querySelector(".card-container")
            .classList.remove("flipped");

          cardContainer.classList.remove("flipped");

          clickArr = [];
        }, 1000);
      }
    }
  });
});
