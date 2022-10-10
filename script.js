const start = document.querySelector("div.start");
const pause = document.querySelector("div.pause");
const reset = document.querySelector("div.reset");
const rounds = document.querySelector("div.round");
const time = document.querySelector("p.time");
const list = document.querySelector("section.rounds ul");

let flag = false;
let ms = 0;
let s = 0;
let min = 0;
let counter = 1;
let actualTime;

function interval() {
  const run = setInterval(() => {
    ms++;
    if (ms == 100) {
      s++;
      ms = 0;
      if (s == 60) {
        min++;
        s = 0;
        if (min == 60) {
          min = 0;
        }
      }
    }
    time.innerHTML = `${min > 9 ? `${min}` : `0${min}`}:${
      s > 9 ? `${s}` : `0${s}`
    }.<span>${ms > 9 ? `${ms}` : `0${ms}`}</span>`;
    actualTime = time.textContent;
  }, 10);
  const pauseTime = function () {
    clearInterval(run);
    flag = false;
  };
  const resetTime = function () {
    pauseTime();
    time.innerHTML = `00:00.<span>00</span>`;
    ms = 0;
    s = 0;
    min = 0;
    actualTime = 0;
    counter = 1;
  };

  pause.addEventListener("click", pauseTime);
  reset.addEventListener("click", resetTime);
}

const startTime = function () {
  if (flag == false) {
    interval();
    flag = true;
  }
};
const roundsList = function () {
  if (actualTime) {
    const li = document.createElement("li");
    li.textContent = "Lap time " + counter + " — " + actualTime;
    list.appendChild(li);
    counter++;
    const removeList = function () {
      list.removeChild(li);
    };
    reset.addEventListener("click", removeList);
  } else if (!actualTime) {
    return;
  }
};

start.addEventListener("click", startTime);
rounds.addEventListener("click", roundsList);
