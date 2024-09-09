let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Laden der Fragen aus der JSON-Datei
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    });

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-box').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;

    let answerBox = document.getElementById('answer-box');
    answerBox.innerHTML = '';

    question.answers.forEach((answer, index) => {
        let button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => checkAnswer(index);
        answerBox.appendChild(button);
    });
}

function checkAnswer(selectedAnswerIndex) {
    let correctAnswerIndex = questions[currentQuestionIndex].correct;
    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
    }
    document.getElementById('next-btn').style.display = 'inline';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('next-btn').style.display = 'none';
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-box').style.display = 'block';
    document.getElementById('result').innerText = `Du hast ${score} von ${questions.length} richtig beantwortet!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
}
