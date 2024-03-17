const questions = {
    addition  : [
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
            question : "What is 3 + 2",
            answer : [
                { text: "4" , correct: false},
                { text: "2" , correct: false},
                { text: "5" , correct: true},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 3 + 3",
            answer : [
                { text: "4" , correct: false},
                { text: "2" , correct: false},
                { text: "5" , correct: false},
                { text: "6" , correct: true},
            ]
        },
        {
            question : "What is 1 + 2",
            answer : [
                { text: "3" , correct: true},
                { text: "2" , correct: false},
                { text: "5" , correct: false},
                { text: "6" , correct: false},
            ]
        },
    ],
    substraction : [
        {
            question : "What is 3 - 2",
            answer : [
                { text: "1" , correct: true},
                { text: "2" , correct: false},
                { text: "5" , correct: false},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 6 - 3",
            answer : [
                { text: "4" , correct: false},
                { text: "3" , correct: true},
                { text: "5" , correct: false},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 7 - 2",
            answer : [
                { text: "1" , correct: false},
                { text: "2" , correct: false},
                { text: "5" , correct: true},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 9 - 2",
            answer : [
                { text: "1" , correct: false},
                { text: "2" , correct: false},
                { text: "5" , correct: false},
                { text: "7" , correct: true},
            ]
        }
    ],
    multiplication  : [
        {
            question : "What is 2 * 2",
            answer : [
                { text: "4" , correct: true},
                { text: "2" , correct: false},
                { text: "3" , correct: false},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 3 * 2",
            answer : [
                { text: "4" , correct: false},
                { text: "2" , correct: false},
                { text: "5" , correct: false},
                { text: "6" , correct: true},
            ]
        },
        {
            question : "What is 3 * 3",
            answer : [
                { text: "4" , correct: false},
                { text: "2" , correct: false},
                { text: "5" , correct: false},
                { text: "9" , correct: true},
            ]
        },
        {
            question : "What is 1 * 2",
            answer : [
                { text: "3" , correct: false},
                { text: "2" , correct: true},
                { text: "5" , correct: false},
                { text: "6" , correct: false},
            ]
        },
    ],
    division  : [
        {
            question : "What is 2 / 2",
            answer : [
                { text: "4" , correct: false},
                { text: "1" , correct: true},
                { text: "3" , correct: false},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 6 / 2",
            answer : [
                { text: "4" , correct: false},
                { text: "2" , correct: false},
                { text: "3" , correct: true},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 6 / 3",
            answer : [
                { text: "4" , correct: false},
                { text: "2" , correct: true},
                { text: "5" , correct: false},
                { text: "6" , correct: false},
            ]
        },
        {
            question : "What is 4 / 2",
            answer : [
                { text: "3" , correct: false},
                { text: "2" , correct: true},
                { text: "5" , correct: false},
                { text: "6" , correct: false},
            ]
        },
    ]
};

let selectedTopics = localStorage.getItem('options');
let retrievedTopics = JSON.parse(selectedTopics);
let questionAnswerArray = [];

retrievedTopics.forEach(topic => {
    let divQuestions = questions[topic];
    divQuestions.forEach(questionObj => {
        const questionText = questionObj.question;            
        const questionAnswer = questionObj.answer;
        questionAnswerArray.push([questionText, questionAnswer]);
    });
});
questionAnswerArray.sort(() => Math.random() - 0.5);
questionAnswerArray = questionAnswerArray.slice(0, 10);
console.log(questionAnswerArray);

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

    let questionsIndexArray = questionAnswerArray[currentQuestionIndex];

    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + questionsIndexArray[0];
    questionsIndexArray[1].forEach(answerArr => {
        const button = document.createElement("button");
        button.innerHTML = answerArr.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answerArr.correct) {
            button.dataset.correct = answerArr.correct;
        }
        button.addEventListener("click", selectAnswer);
    })    
    // console.log(questionAnswerArray);

    // let retrievedTopics = JSON.parse(selectedTopics);
    // let questionAnswerArray = [[]];
    
    // retrievedTopics.forEach(topic => {
    //     let divQuestions = questions[topic];
    //     let currentQuestionIndex = 0;
    //     divQuestions.forEach(questionObj => {
    //         const questionText = questionObj.question;            
    //         const questionAnswer = questionObj.answer;
    //         questionAnswerArray[currentQuestionIndex][0] = questionText; 
    //         questionAnswerArray[currentQuestionIndex][1] = questionAnswer; 
    //         currentQuestionIndex++; 
    //         // currentQuestionIndex++;
    //         // questionAnswer.forEach(answers =>{
    //         //     const button = document.createElement("button");
    //         //     button.innerHTML = answers.text;
    //         //     button.classList.add("btn");
    //         //     answerButton.appendChild(button);
    //         // })
    //         // topicQuestions[topicQuestionsIndex] = questionText;
    //         // topicQuestionsIndex++;
    //     })
        
    //     console.log(questionAnswerArray)
    // })
    // questionElement.innerHTML = questionNumber + ". " + questionText;
    // // Shuffle the questions to randomize
    // topicQuestions.sort(() => Math.random() - 0.5);
    // topicQuestions = topicQuestions.slice(0, 10);
    // console.log(topicQuestions);
    
    // topicQuestions.forEach(index => {
    //     questionElement.innerHTML = questionNumber + ". " + index;
    // })
    // // topicQuestions.answer.forEach(answer => {
    //     const button = document.createElement("button");
    //     button.innerHTML = answer.text;
    //     button.classList.add("btn");
    //     answerButton.appendChild(button);
    //     if (answer.correct) {
    //         button.dataset.correct = answer.correct;
    //     }
    //     button.addEventListener("click", selectAnswer);
    // });

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
  
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questionAnswerArray.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questionAnswerArray.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click" , ()=> {
    if(currentQuestionIndex < questionAnswerArray.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz()