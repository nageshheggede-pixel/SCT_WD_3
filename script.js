const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to a web page?",
        options: ["JavaScript", "HTML", "CSS", "C++"],
        answer: "JavaScript"
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClassName()",
            "createElement()"
        ],
        answer: "getElementById()"
    },
    {
        question: "Which HTML tag is used to connect JavaScript?",
        options: ["<style>", "<script>", "<link>", "<js>"],
        answer: "<script>"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");


function startQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}


function showQuestion() {
    const question = questions[currentQuestion];

    selectedAnswer = null;
    nextBtn.disabled = true;

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionText.textContent = question.question;

    optionsContainer.innerHTML = "";

    question.options.forEach((option) => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;

        button.addEventListener("click", () => {
            if (selectedAnswer !== null) {
                return;
            }

            selectedAnswer = option;

            const allButtons =
                optionsContainer.querySelectorAll(".option-btn");

            allButtons.forEach((btn) => {
                btn.disabled = true;
            });

            if (option === question.answer) {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("incorrect");

                allButtons.forEach((btn) => {
                    if (btn.textContent === question.answer) {
                        btn.classList.add("correct");
                    }
                });
            }

            scoreDisplay.textContent = `Score: ${score}`;
            nextBtn.disabled = false;
        });

        optionsContainer.appendChild(button);
    });
}


function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = `${score}/${questions.length}`;

    if (score === questions.length) {
        resultMessage.textContent = "Perfect score! Excellent work!";
    } else if (score >= questions.length / 2) {
        resultMessage.textContent = "Good job! Keep practicing!";
    } else {
        resultMessage.textContent = "Keep learning and try again!";
    }
}


startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", startQuiz);