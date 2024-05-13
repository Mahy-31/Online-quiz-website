const startBtn = document.querySelector('.start-btn');
const popup = document.querySelector('.popups');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popup.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () => {
    popup.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    quizBox.classList.add('active');
    popup.classList.remove('active');
    main.classList.remove('active');

    showQs(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQs(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQs(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;


const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
        showQs(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
    
}

const optionsList = document.querySelector('.options-list')

function showQs(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].Number}.${questions[index].question}`;
    let optionTag = `<div class="options"><span>${questions[index].options[0]}</span></div>
    <div class="options"><span>${questions[index].options[1]}</span></div>
    <div class="options"><span>${questions[index].options[2]}</span></div>
    <div class="options"><span>${questions[index].options[3]}</span></div>`;

    optionsList.innerHTML = optionTag;

    const option = document.querySelectorAll('.options');
    for (let i=0; i<option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allOptions = optionsList.children.length;

    if (userAns == correctAns){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');
        for (let i=0; i < allOptions; i++){
            if(optionsList.children[i].textContent == correctAns) {
                optionsList.children[i].setAttribute('class', 'options correct');
            }
        }
    }

    for (let i=0; i < allOptions; i++){
        optionsList.children[i].classList.add('disabled');
    }
    
    nextBtn.classList.add('active');

}

function questionCounter(index){
    const qTotal = document.querySelector('.total');
    qTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreTest = document.querySelector('.score');
    headerScoreTest.textContent = `score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreTest = document.querySelector('.score-text');
    scoreTest.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(rgb(192, 15, 83) ${progressStartValue * 3.6}deg, rgb(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

}