const questions = [
    {
        question : "What is 2 + 2",
        answer : [
            { text: "4" , correct: true},
            { text: "2" , correct: false},
            { text: "3" , correct: false},
            { text: "6" , correct: false},
        ]
    },
    {
        question : "What is 3 + 3",
        answer : [
            { text: "4" , correct: false},
            { text: "2" , correct: false},
            { text: "3" , correct: false},
            { text: "6" , correct: true},
        ]
    },
    {
        question : "What is 1 + 1",
        answer : [
            { text: "4" , correct: false},
            { text: "2" , correct: true},
            { text: "3" , correct: false},
            { text: "6" , correct: false},
        ]
    },
    {
        question : "What is 2 + 3",
        answer : [
            { text: "5" , correct: true},
            { text: "2" , correct: false},
            { text: "3" , correct: false},
            { text: "6" , correct: false},
        ]
    },
]

const questionElement = document.querySelector("#question");
const answerButton = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML  = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click" , ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz()