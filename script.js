const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  const questionsContainer = document.getElementById("questions");
  questionsContainer.innerHTML = "";
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    q.choices.forEach((choice) => {
      const checked = userAnswers[index] === choice ? "checked" : "";
      questionDiv.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${choice}" ${checked} />
          ${choice}
        </label>
      `;
    });
    questionsContainer.appendChild(questionDiv);
  });

  document.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const [questionIndex] = event.target.name.match(/\d+/);
      userAnswers[questionIndex] = event.target.value;
      sessionStorage.setItem("progress", JSON.stringify(userAnswers));
    });
  });
}

document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  const scoreContainer = document.getElementById("score");
  scoreContainer.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

document.addEventListener("DOMContentLoaded", () => {
  userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
  document.getElementById("score").textContent = "";
  renderQuestions();
});
