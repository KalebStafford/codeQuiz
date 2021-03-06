let beginBtn = document.querySelector(".beginBtn button");
let ruleContainer = document.querySelector(".ruleContainer");
let quitBtn = ruleContainer.querySelector(".workingBtn .quitBtn");
let restartBtn = ruleContainer.querySelector(".workingBtn .restartBtn");
let quizContainer = document.querySelector(".quizContainer");
let resultContainer = document.querySelector(".resultContainer");
let optionChoices = document.querySelector(".optionChoices");
let timeDisplay = document.querySelector("header .timeDisplay");
let timeText = document.querySelector(".timerContainer .timeLeft");
let timeCount = document.querySelector(".timerContainer .timeSeconds");
let restartQuiz = resultContainer.querySelector(".workingBtn .restartBtn");
let quitQuiz = resultContainer.querySelector(".workingBtn .quitBtn");
let nextBtn = document.querySelector("footer .nextBtn");
let questionCounter = document.querySelector("footer .totalQuestions");
let questionMain = document.querySelector(".questionMain");
let correctIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let wrongIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let timeValue = 30;
let questionCount = 0;
let questionNumber = 1;
let liveScore = 0;
let timer;
let timerLine;
let widthVar = 0;
restartQuiz.onclick = () => {
  quizContainer.classList.add("liveQuiz");
  resultContainer.classList.remove("activeResult");
  liveScore = 0;
  widthVar = 0;
  questionCount = 0;
  timeValue = 30;
  questionNumber = 1;
  displayQuestions(questionCount);
  questionCounterMain(questionNumber);
  startTime(timeValue);
  startTimeContainer(widthVar);
  clearInterval(timer);
  clearInterval(timerLine);
  timeText.textContent = "Time Left";
  nextBtn.classList.remove("show");
};
quitQuiz.onclick = () => {
  window.location.reload();
};
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;
    clearInterval(timer);
    clearInterval(timerLine);
    startTime(timeValue);
    startTimeContainer(widthVar);
    displayQuestions(questionCount);
    questionCounterMain(questionNumber);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
  } else {
    clearInterval(timer);
    clearInterval(timerLine);
    showResult();
  }
};
function optionSelected(answer) {
  clearInterval(timer);
  clearInterval(timerLine);
  let userAns = answer.textContent;
  let correcAns = questions[questionCount].answer;
  let allOptions = optionChoices.children.length;
  if (userAns == correcAns) {
    liveScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", correctIcon);
    console.log("Correct");
    console.log("Your correct answers = " + liveScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", wrongIcon);
    console.log("Wrong");
    for (i = 0; i < allOptions; i++) {
      if (optionChoices.children[i].textContent == correcAns) {
        optionChoices.children[i].setAttribute("class", "option correct");
        optionChoices.children[i].insertAdjacentHTML("beforeend", correctIcon);
        console.log("Displayed Correct Answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    optionChoices.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("show");
}
function displayQuestions(Data) {
  let que_tag =
    "<span>" +
    questions[Data].numb +
    ". " +
    questions[Data].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[Data].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[Data].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[Data].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[Data].options[3] +
    "</span></div>";
  questionMain.innerHTML = que_tag;
  optionChoices.innerHTML = option_tag;
  let option = optionChoices.querySelectorAll(".option");
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
function startTime(time) {
  timer = setInterval(timerContainer, 1000);
  function timerContainer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(timer);
      timeText.textContent = "Out of Time";
      let allOptions = optionChoices.children.length;
      let correcAns = questions[questionCount].answer;
      for (i = 0; i < allOptions; i++) {
        if (optionChoices.children[i].textContent == correcAns) {
          optionChoices.children[i].setAttribute("class", "option correct");
          optionChoices.children[i].insertAdjacentHTML(
            "beforeend",
            correctIcon
          );
          console.log("Out of Time.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        optionChoices.children[i].classList.add("disabled");
      }
      nextBtn.classList.add("show");
    }
  }
}
function startTimeContainer(time) {
  timerLine = setInterval(timerContainer, 29);
  function timerContainer() {
    time += 1;
    timeDisplay.style.width = time + "px";
    if (time > 500) {
      clearInterval(timerLine);
    }
  }
}
function questionCounterMain(Data) {
  let totalQuestions =
    "<span><p>" +
    Data +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  questionCounter.innerHTML = totalQuestions;
}
beginBtn.onclick = () => {
  ruleContainer.classList.add("liveInformation");
};
quitBtn.onclick = () => {
  ruleContainer.classList.remove("liveInformation");
};
restartBtn.onclick = () => {
  ruleContainer.classList.remove("liveInformation");
  quizContainer.classList.add("liveQuiz");
  displayQuestions(0);
  questionCounterMain(1);
  startTime(30);
  startTimeContainer(0);
};