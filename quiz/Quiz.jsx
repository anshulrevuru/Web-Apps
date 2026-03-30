import { useState } from "react";
import "./quiz.css";

const questions = [
  {
    question: "Who's the most honest and genuine reviewer?",
    options: [
      "Suraj Kumar",
      "Abhishek",
      "Yogesh Rokde",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "Why Anil Ravipudi didn't direct Bhagavanth Kesari remake in Kollywood? Is it because",
    options: [
      "he's not comfortable.",
      "he doesn't want to.",
      "it's not his strength.",
      "Both a) and c)"
    ],
    answer: "Both a) and c)"
  },
  {
    question: "In CS, which symbol is used for power?",
    options: [
        "^", 
        "**", 
        "pow",
        "exp"
    ],
    answer: "**"
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
    question: "CC's similar to which subject?",
    options: [
        "OS", 
        "DAA", 
        "MPCA", 
        "CNS"
    ],
    answer: "OS"
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const current = questions[index];

  const handleSelect = (option) => {
    setUserAnswers({ ...userAnswers, [index]: option });
  };

  const nextQuestion = () => {
    if (!userAnswers[index]) {
      alert("Please select an answer");
      return;
    }

    if (index === questions.length - 1) {
      setShowResult(true);
    } else {
      setIndex(index + 1);
    }
  };

  const prevQuestion = () => {
    if (index > 0) setIndex(index - 1);
  };

  const score = Object.keys(userAnswers).reduce((acc, key) => {
    return userAnswers[key] === questions[key].answer ? acc + 1 : acc;
  }, 0);

  if (showResult) {
    return (
      <div className="app">
        <h2>Quiz Completed 🎉</h2>
        <h3>
          Score: {score}/{questions.length}
        </h3>
        <button onClick={() => window.location.reload()}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h2>{current.question}</h2>

      <div className="options">
        {current.options.map((opt, i) => (
          <label key={i} className="option">
            <input
              type="radio"
              name="answer"
              checked={userAnswers[index] === opt}
              onChange={() => handleSelect(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="buttons">
        <button onClick={prevQuestion} disabled={index === 0}>
          Previous
        </button>
        <button onClick={nextQuestion}>
          {index === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default App;
