// Questions data
const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"] },
  { question: "What is 2 + 2?", choices: ["3", "4", "5", "6"] },
  { question: "What is the largest planet in the solar system?", choices: ["Earth", "Mars", "Jupiter", "Venus"] },
  { question: "What is the boiling point of water?", choices: ["90°C", "100°C", "120°C", "80°C"] },
  { question: "Who wrote 'Hamlet'?", choices: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"] }
];

// Initialize userAnswers from sessionStorage or set it to an empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to render questions
function renderQuestions() {
  const questionContainer = document.getElementById("questions");
  questionContainer.innerHTML = ""; // Clear the container

  questions.forEach((questionObj, index) => {
    const questionDiv = document.createElement("div"); // Create a div for each question

    // Create and append question text
    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${questionObj.question}`;
    questionDiv.appendChild(questionText);

    // Create radio buttons for each choice
    questionObj.choices.forEach((choice) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `question-${index}`; // Group by question index
      radioInput.value = choice;

      // Set "checked" if the user's saved answer matches this choice
      if (userAnswers[index] === choice) {
        radioInput.checked = true;
      }

      // Add a change event listener to save the user's selection
      radioInput.addEventListener("change", () => {
        userAnswers[index] = choice; // Update the user's answer
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save to sessionStorage
      });

      // Create a label for the radio input
      const label = document.createElement("label");
      label.textContent = choice;

      // Append the input and label to the question div
      questionDiv.appendChild(radioInput);
      questionDiv.appendChild(label);
    });

    // Append the question div to the container
    questionContainer.appendChild(questionDiv);
  });
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0; // Initialize score

  questions.forEach((questionObj, index) => {
    if (userAnswers[index] === questionObj.choices[0]) {
      // Assume the correct answer is always the first choice
      score++;
    }
  });

  // Update the score display
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save the score to localStorage for Cypress test validation
  localStorage.setItem("score", score.toString());
}

// Render the questions on page load
renderQuestions();

// Add an event listener for the "Submit" button
document.getElementById("submit").addEventListener("click", calculateScore);
