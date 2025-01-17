//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
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

// Load saved progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display questions
const questionsContainer = document.getElementById("questions");

questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.className = "question";
  questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
  
  q.choices.forEach((choice) => {
    const optionId = `q${index}-${choice}`;
    const checked = savedProgress[index] === choice ? "checked" : "";
    questionDiv.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${choice}" ${checked} />
        ${choice}
      </label>
    `;
  });

  questionsContainer.appendChild(questionDiv);
});

// Save progress to session storage on selection
document.querySelectorAll("input[type='radio']").forEach((input) => {
  input.addEventListener("change", (event) => {
    const [questionIndex] = event.target.name.match(/\d+/);
    savedProgress[questionIndex] = event.target.value;
    sessionStorage.setItem("progress", JSON.stringify(savedProgress));
  });
});

// Handle submission
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (savedProgress[index] === q.answer) {
      score++;
    }
  });

  // Display the score
  const scoreContainer = document.getElementById("score");
  scoreContainer.textContent = `Your score is ${score} out of 5.`;

  // Save the score in local storage
  localStorage.setItem("score", score);
});


// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question[0]);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
