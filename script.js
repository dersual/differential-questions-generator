var playButton = document.getElementById("play");

playButton.addEventListener("click", function () {
  document.getElementById("gameScreenContainer").style.display = "block";
  document.getElementById("startContainer").style.display = "none";
  displayProblem();
});
var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () {
  checkPlayerAnswer();
});
var points = 0;
var currentQuestion;
var answer;
var playerAnswer;
function createQuestion() {
  const basicFunctions = [
    "sin(x)",
    "cos(x)",
    "tan(x)",
    "exp(x)",
    "log(x)",
    "asin(x)",
    "acos(x)",
    "atan(x)",
    "x^2",
    "x^3",
    "sqrt(x)",
    "1/x",
  ];

  const complexFunctions = [
    "sin(x)^2 + cos(x)^2",
    "exp(x^2) + log(x + 1)",
    "sin(x^2) * cos(x)",
    "exp(sin(x))",
    "log(x^2 + 1) / tan(x)",
    "x^2 * sin(x) - cos(x)",
    "exp(x) * cos(x) + sin(x)",
    "log(x) + exp(x) - x^3",
    "sqrt(x) * exp(x^2)",
    "tan(x^2 + x) / cos(x)", 
    'sec(x)',
    'csc(x)',
    'cot(x)',
    'sec(x) * tan(x)',
    'csc(x) * cot(x)'
  ];

  // Combine basic functions with complex functions
  const functions = basicFunctions.concat(complexFunctions);

  // Select a random function
  currentQuestion = functions[Math.floor(Math.random() * functions.length)];  
  currentQuestion = currentQuestion.replace(/sec\((.*?)\)/g, '(1/cos($1))');
  currentQuestion =  currentQuestion.replace(/csc\((.*?)\)/g, '(1/sin($1))');
  currentQuestion =  currentQuestion.replace(/cot\((.*?)\)/g, '(1/tan($1))');

  // Calculate its derivative using math.js
  answer = math.derivative(  currentQuestion, "x").toString();

  // Convert to LaTeX
  const questionLatex = math.parse(currentQuestion).toTex();

  return { questionLatex };
}
function displayProblem() {
  var questionElement = document.getElementById("question");
  questionElement.innerHTML = " ";
  const { questionLatex } = createQuestion();
  questionElement.innerHTML = `$$${questionLatex}$$`;
  MathJax.typeset();
}

function endGame() {
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("gameScreenContainer").style.display = "none";
}
document.getElementById("restart").addEventListener("click", reset);
function reset() {
  location.reload();
}

function checkPlayerAnswer() {
  var result;
  var resultContainer = document.getElementById("correctAnswer");
  var pointElement = document.getElementById("points");
  playerAnswer = document.getElementById("answer").getValue();
  // Normalize both the user's answer and the correct answer
  const playerAnswerSimplified = math.simplify(playerAnswer).toString();
  const correctAnswerSimplified = math.simplify(answer).toString();
  // Compare the simplified answers
  if (playerAnswerSimplified == correctAnswerSimplified ||  math.parse(playerAnswerSimplified).equals(math.parse(correctAnswerSimplified))) {
    points++;
    pointElement.innerHTML = "Points: " + points;
    displayProblem();
  } else { 
    answerLatex = math.parse(answer).toTex()
    result = `Correct answer is \\(${answerLatex}\\)`;
    resultContainer.innerHTML += result;
    document.getElementById("pointsEarned").innerHTML = "Points Earned: " + points;
    endGame();
    MathJax.typeset();
  }
}
