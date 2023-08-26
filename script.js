const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { Text: "<javascript>", correct: false },
      { Text: "<script>", correct: true },
      { Text: "<js>", correct: false },
      { Text: "<scripting>", correct: false },
    ],
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      {
        Text: "Both the <head> section and the <body> section are correct",
        correct: true,
      },
      { Text: "The <body> section", correct: false },
      { Text: "The <head> section", correct: false },
      { Text: "The <link> section", correct: false },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { Text: "msg('Hello World');", correct: false },
      { Text: "alertBox('Hello World');", correct: false },
      { Text: "msgBox('Hello World');", correct: false },
      { Text: "alert('Hello World');", correct: true },
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { Text: "if (i == 5)", correct: true },
      { Text: "if i == 5 then", correct: false },
      { Text: "if i = 5", correct: false },
      { Text: "if i = 5 then", correct: false },
    ],
  },
  {
    question: "How does a FOR loop start?",
    answers: [
      { Text: "for (i = 0; i <= 5; i++)", correct: true },
      { Text: "for i = 1 to 5", correct: false },
      { Text: "for i = 1 to 5", correct: false },
      { Text: "for (i = 0; i <= 5)", correct: false },
    ],
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: [
      { Text: "'This is a comment", correct: false },
      { Text: "<!--This is a comment-->", correct: false },
      { Text: "//This is a comment", correct: true },
      { Text: "##This is a comment", correct: false },
    ],
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { Text: "var colors = 'red', 'green', 'blue'", correct: false },
      { Text: "var colors = ['red', 'green', 'blue']", correct: true },
      {
        Text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
        correct: false,
      },
      { Text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
    ],
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
      { Text: "rnd(7.25)", correct: false },
      { Text: "round(7.25)", correct: false },
      { Text: "Math.round(7.25)", correct: true },
      { Text: "Math.rnd(7.25)", correct: false },
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { Text: "onmouseover", correct: false },
      { Text: "onchange", correct: false },
      { Text: "onmouseclick", correct: false },
      { Text: "onclick", correct: true },
    ],
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: [
      { Text: "top(x, y)", correct: false },
      { Text: "Math.max(x, y)", correct: true },
      { Text: "ceil(x, y)", correct: false },
      { Text: "Math.ceil(x, y)", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { Text: "*", correct: false },
      { Text: "-", correct: false },
      { Text: "x", correct: false },
      { Text: "=", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.Text; // Set the question text as the button's text
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  } 
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true" ){
      button.classList.add("correct");

    }
    button.disabled = true;
  });
  nextButton.style.display = "block"; 
}



function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}



function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})


startQuiz();