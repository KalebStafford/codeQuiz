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