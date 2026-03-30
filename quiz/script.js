const questions = [
  {
    question: "Who's the most honest reviewer?",
    options: [
      "Suraj Kumar",
      "Abhishek",
      "Yogesh Rokde",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question:
      "Why Anil Ravipudi didn't direct Bhagavanth Kesari in Kollywood? Is it because",
    options: [
      "he's not comfortable.",
      "he doesn't want to.",
      "it's not his strength.",
      "Both a) and c)"
    ],
    answer: "both a. and c."
  },
  {
    question: "In CS, which symbol's used for power?",
    options: [
      "^",
      "**",
      "pow",
      "Both a) and b)"
    ],
    answer: "Both a) and b)"
  },
  {
    question: "Who's the most funniest and humorous reviewer?",
    options: [
      "Suraj Kumar",
      "Abhishek",
      "Yogesh Rokde",
      "All of the above"
    ],
    answer: "Suraj Kumar"
  },
  {
    question: "CC is similar to which subject?",
    options: [
      "OS",
      "DAA",
      "MPCA",
      "DDCO"
    ],
    answer: "OS"
  }
];

let index = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const options = document.getElementsByName("option");

const optionLabels = [
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
  document.getElementById("option4")
];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  deselectAnswers();

  const q = questions[index];
  questionEl.innerText = q.question;

  optionLabels.forEach((label, i) => {
    if (q.options[i]) {
      label.innerText = q.options[i];
      label.parentElement.style.display = "block";
    } else {
      label.parentElement.style.display = "none";
    }
  });

  if (userAnswers[index]) {
    options.forEach(opt => {
      if (opt.nextElementSibling.innerText === userAnswers[index]) {
        opt.checked = true;
      }
    });
  }

  prevBtn.disabled = index === 0;
}

function getSelected() {
  let selected = null;
  options.forEach(opt => {
    if (opt.checked) {
      selected = opt.nextElementSibling.innerText;
    }
  });
  return selected;
}

function deselectAnswers() {
  options.forEach(opt => (opt.checked = false));
}

nextBtn.addEventListener("click", () => {
  const selected = getSelected();

  if (!selected) {
    alert("Please select an answer");
    return;
  }

  userAnswers[index] = selected;

  if (index === questions.length - 1) {
    calculateScore();
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    return;
  }

  index++;
  loadQuestion();
});

prevBtn.addEventListener("click", () => {
  userAnswers[index] = getSelected();
  index--;
  loadQuestion();
});

function calculateScore() {
  score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === questions[i].answer) {
      score++;
    }
  });
  scoreEl.innerText = `${score}/${questions.length}`;
}

loadQuestion();
