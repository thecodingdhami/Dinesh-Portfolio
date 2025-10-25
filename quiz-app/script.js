const container = document.querySelector('.container');
const quizBox = document.querySelector('.quiz-box');
let questionBox = document.querySelector('.question');
let choicesBox = document.querySelector('.choices');
let nextBtn = document.querySelector('.nextBtn');
let scoreCard = document.querySelector('.scoreCard');
const alertBox = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [
  // --- HTML ---
  { question: "Which HTML tag is used to define the largest heading?", choices: ["<heading>", "<h6>", "<h1>", "<head>"], answer: "<h1>", category: "HTML", level: "easy" },
  { question: "Which HTML tag is used to insert a line break?", choices: ["<break>", "<lb>", "<br>", "<hr>"], answer: "<br>", category: "HTML", level: "easy" },
  { question: "Which HTML attribute specifies an alternate text for an image?", choices: ["alt", "title", "src", "href"], answer: "alt", category: "HTML", level: "easy" },
  { question: "Which HTML element is used to create a dropdown list?", choices: ["<input>", "<select>", "<dropdown>", "<list>"], answer: "<select>", category: "HTML", level: "medium" },
  { question: "Which tag is used to embed a video in HTML5?", choices: ["<media>", "<video>", "<movie>", "<embed>"], answer: "<video>", category: "HTML", level: "medium" },
  { question: "Which tag represents a navigation section in HTML5?", choices: ["<nav>", "<menu>", "<section>", "<header>"], answer: "<nav>", category: "HTML", level: "medium" },

  // --- CSS ---
  { question: "Which CSS property changes the text color?", choices: ["font-color", "text-color", "color", "foreground-color"], answer: "color", category: "CSS", level: "easy" },
  { question: "Which CSS property is used to make text italic?", choices: ["font-italic", "font-style", "text-decoration", "text-style"], answer: "font-style", category: "CSS", level: "easy" },
  { question: "Which CSS property controls the stacking order of elements?", choices: ["position", "z-index", "order", "stack"], answer: "z-index", category: "CSS", level: "medium" },
  { question: "Which CSS property is used to control element transparency?", choices: ["opacity", "visibility", "alpha", "filter"], answer: "opacity", category: "CSS", level: "medium" },
  { question: "Which CSS property is used to control line spacing?", choices: ["line-height", "spacing", "letter-spacing", "text-height"], answer: "line-height", category: "CSS", level: "medium" },
  { question: "Which CSS layout uses rows and columns?", choices: ["flexbox", "grid", "float", "table"], answer: "grid", category: "CSS", level: "medium" },
  { question: "Which CSS function is used to apply gradients?", choices: ["gradient()", "linear-gradient()", "color-mix()", "background-gradient()"], answer: "linear-gradient()", category: "CSS", level: "medium" },
  { question: "Which CSS property adds space inside an element?", choices: ["padding", "margin", "border", "spacing"], answer: "padding", category: "CSS", level: "easy" },
  { question: "Which CSS pseudo-class is used for mouse hover?", choices: [":active", ":focus", ":hover", ":visited"], answer: ":hover", category: "CSS", level: "easy" },

  // --- JavaScript ---
  { question: "Which keyword is used to declare a constant in JavaScript?", choices: ["let", "const", "var", "constant"], answer: "const", category: "JavaScript", level: "easy" },
  { question: "What will console.log(typeof NaN) output?", choices: ["undefined", "number", "NaN", "object"], answer: "number", category: "JavaScript", level: "medium" },
  { question: "Which method removes the last element of an array?", choices: ["shift()", "pop()", "remove()", "splice()"], answer: "pop()", category: "JavaScript", level: "easy" },
  { question: "Which array method executes a function for each element?", choices: ["map()", "filter()", "forEach()", "reduce()"], answer: "forEach()", category: "JavaScript", level: "easy" },
  { question: "Which symbol is used for strict equality comparison?", choices: ["==", "===", "=", "!=="], answer: "===", category: "JavaScript", level: "easy" },
  { question: "Which built-in method converts JSON to a string?", choices: ["JSON.parse()", "JSON.stringify()", "JSON.toString()", "JSON.objectify()"], answer: "JSON.stringify()", category: "JavaScript", level: "medium" },
  { question: "What will '2' * 2 evaluate to?", choices: ["22", "4", "NaN", "Error"], answer: "4", category: "JavaScript", level: "medium" },
  { question: "What is the output of typeof null?", choices: ["null", "undefined", "object", "number"], answer: "object", category: "JavaScript", level: "medium" },
  { question: "Which function is used to delay code execution in JavaScript?", choices: ["delay()", "sleep()", "setTimeout()", "pause()"], answer: "setTimeout()", category: "JavaScript", level: "easy" },
  { question: "Which keyword is used to handle errors in JS?", choices: ["try", "error", "catch", "except"], answer: "try", category: "JavaScript", level: "medium" },

  // --- Python ---
  { question: "Which function is used to display output in Python?", choices: ["show()", "display()", "echo()", "print()"], answer: "print()", category: "Python", level: "easy" },
  { question: "Which keyword is used for loops in Python?", choices: ["repeat", "for", "loop", "iterate"], answer: "for", category: "Python", level: "easy" },
  { question: "What is the output of len('Python')?", choices: ["5", "6", "7", "Error"], answer: "6", category: "Python", level: "easy" },
  { question: "Which of the following is a tuple?", choices: ["[1,2,3]", "{1,2,3}", "(1,2,3)", "<1,2,3>"], answer: "(1,2,3)", category: "Python", level: "medium" },
  { question: "Which keyword is used to create a class in Python?", choices: ["object", "function", "class", "def"], answer: "class", category: "Python", level: "medium" },
  { question: "Which of these data types is immutable in Python?", choices: ["list", "tuple", "set", "dict"], answer: "tuple", category: "Python", level: "medium" },
  { question: "What is the output of 5 // 2 in Python?", choices: ["2", "2.5", "3", "Error"], answer: "2", category: "Python", level: "medium" },
  { question: "Which keyword is used to import modules in Python?", choices: ["module", "load", "import", "include"], answer: "import", category: "Python", level: "easy" },
  { question: "Which Python data structure uses key-value pairs?", choices: ["list", "set", "tuple", "dictionary"], answer: "dictionary", category: "Python", level: "easy" },
  { question: "Which operator is used for exponentiation in Python?", choices: ["^", "**", "exp()", "pow"], answer: "**", category: "Python", level: "medium" }
];

let shuffledQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerID = null;
let quizOver = false;

const quizBoxTemplate = quizBox.innerHTML;

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

const showAlert = (msg, color = "#10b981") => {
  alertBox.textContent = msg;
  alertBox.style.backgroundColor = color;
  alertBox.style.display = "block";
  setTimeout(() => alertBox.style.display = "none", 2000);
};

const showQuestions = () => {
  const question = shuffledQuiz[currentQuestionIndex];
  questionBox.textContent = question.question;
  const shuffledChoices = shuffleArray([...question.choices]);
  choicesBox.innerHTML = "";

  shuffledChoices.forEach(choiceText => {
    const choice = document.createElement("div");
    choice.classList.add("choice");
    choice.textContent = choiceText;
    choice.onclick = () => {
      document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
      choice.classList.add("selected");
    };
    choicesBox.appendChild(choice);
  });
  startTimer();
};

const checkAnswer = () => {
  const selected = document.querySelector(".choice.selected");
  if (!selected) {
    showAlert("Please select an answer", "#f87171");
    return;
  }
  if (selected.textContent === shuffledQuiz[currentQuestionIndex].answer) {
    score++;
    showAlert("✅ Correct!", "#10b981");
  } else {
    showAlert(`❌ Correct answer: ${shuffledQuiz[currentQuestionIndex].answer}`, "#f97316");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuiz.length) {
    showQuestions();
  } else {
    stopTimer();
    showScore();
  }
};

const showScore = () => {
  stopTimer();
  quizBox.innerHTML = `
    <div class="result-screen">
      <h3>You scored ${score} / ${shuffledQuiz.length}!</h3>
      <p class="scoreCard">Well done 🎉</p>
      <button class="btn restartBtn">Play Again</button>
    </div>
  `;
  timer.style.display = "none";

  document.querySelector(".restartBtn").addEventListener("click", () => {
    quizBox.innerHTML = quizBoxTemplate;
    questionBox = quizBox.querySelector('.question');
    choicesBox = quizBox.querySelector('.choices');
    nextBtn = quizBox.querySelector('.nextBtn');
    scoreCard = quizBox.querySelector('.scoreCard');
    nextBtn.addEventListener("click", checkAnswer);
    timer.style.display = "flex";
    startQuiz();
  });
};

const startTimer = () => {
  clearInterval(timerID);
  timeLeft = 15;
  timer.textContent = timeLeft;
  timerID = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerID);
      checkAnswer();
    }
  }, 1000);
};

const stopTimer = () => clearInterval(timerID);

const startQuiz = () => {
  score = 0;
  currentQuestionIndex = 0;
  shuffledQuiz = shuffleArray([...quiz]); // randomize questions each time
  quizOver = false;
  document.querySelector('.intro').classList.add('hidden');
  quizBox.classList.remove('hidden');
  showQuestions();
};

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", checkAnswer);
