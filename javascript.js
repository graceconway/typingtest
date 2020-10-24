const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const innerText = document.querySelector("#inner-text p").innerHTML;
const resetButton = document.querySelector("#reset-button");
const theTimer = document.querySelector(".the-timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// For numbers 0-9 add zero:
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Start a normal timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] *6000))
}


// Match inputed text with orignial text:
function spellcheck() {
  let textEntered = testArea.value;
  let innerTextSame = innerText.substring(0,textEntered.length);

  if (textEntered == innerText) {
      clearInterval(interval);
    testWrapper.style.borderColor = "#429890";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCf3";
    } else {
      testWrapper.style.borderColor = "#E95D0F";
    }
  }

}

// Start timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
      timerRunning = true;
      interval = setInterval(runTimer, 10);
  }

  console.log(textEnteredLength);

}

// Reset all:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.vaule = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}


// Event listeners for input from keyboard and reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);
