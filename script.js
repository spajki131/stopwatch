const start = document.querySelector("div.start");
const pause = document.querySelector("div.pause");
const reset = document.querySelector("div.reset");
const rounds = document.querySelector("div.round");
const time = document.querySelector("div.time");
const list = document.querySelector("div.rounds ul");

let flag = false;
let ms = 0;
let s = 0;
let min = 0;
let counter = 1;
let actualTime;
//funckja sterujaca
function interval() {
  //ustawienie interval
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
  //funkcja zatrzumujaca stoper
  const pauseTime = function () {
    clearInterval(run);
    flag = false;
  };
  //funkcja resetujaca/zerujaca stoper
  const resetTime = function () {
    pauseTime();
    time.textContent = "00:00:00";
    ms = 0;
    s = 0;
    min = 0;
    actualTime = 0;
    counter = 1;
  };

  pause.addEventListener("click", pauseTime);
  reset.addEventListener("click", resetTime);
}

//funkcja startująca stoper
const startTime = function () {
  if (flag == false) {
    interval();
    flag = true;
  }
};
//funkcja robiącą miedzyczasy/rundy
const roundsList = function () {
  if (actualTime) {
    const li = document.createElement("li");
    li.textContent = "Międzyczas " + counter + " — " + actualTime;
    list.appendChild(li);
    counter++;
    //funckja usuwa wszystkie elementy listy
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
