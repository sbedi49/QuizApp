const questions = [];
const answers = [];
const incorrect = [];
const endgame = document.getElementById("endgame")
const game = document.getElementById("quiz")
const stats = document.getElementById("stats")
const question = document.getElementById("q");
const main = document.getElementById("main");
const quiz = document.querySelectorAll("li");
const qCount = document.getElementById("count");
const finalScore = document.getElementById("finalScore")
const mcq = document.getElementById("mcq")
let questionCount = 1;
let correctCounter = 0;
let answer = answers[questionCount]


//Load Data and Add it to array on window load
window.onload = loadData()

async function loadData() {
const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
const data = await response.json()
const {results} = data

results.forEach(result => {
questions.push(result.question)
answers.push(result.correct_answer)
incorrect.push(result.incorrect_answers)
})
}

const startGame = () => {
    main.style.display = "none"
    game.style.display = "flex"
    
//Get random integer to place answer
    let randomNum = Math.floor(Math.random() * 3) + 1
    question.innerText = questions[questionCount];
    quiz[randomNum].innerText = answers[questionCount]
    console.log(questions)
    
// Set incorrect answers as options and take out undefined options
    for (let i = 0; i < quiz.length; i++) {
        if (!(quiz[i].innerText === answer)) {
            quiz[i].innerText = incorrect[questionCount][i]
            if (quiz[i].outerText === "undefined") {
                quiz[i].style.display = "none"
            }
        }
    }
}
//Add Event Listener to see if clicked right or wrong
quiz.forEach(item => {item.addEventListener("click",
            () => {
            if ((item.innerText === answer)) {
                score();
                count();
                startGame();
                
            }
            else {
                count();
                startGame();
            }
     })
})

const score = () => {
    correctCounter++;
    finalScore.innerText = "Final Score:" + correctCounter + "/10"

}

const count = () => {
    questionCount ++;
    qCount.innerText = questionCount + "/10"
    if (questionCount === 10) {
        endGame();
    }
    
}

const endGame = () => {
    game.style.display= "none"
    endgame.style.display = "flex"
    stats.style.display = "none"
    q.style.display = "none"
    mcq.style.display = "none"
}

const retry = () => {
    questionCount = 1
    correctCounter = 0
    qCount.innerText = questionCount + "/10"
    endgame.style.display = "none"
    main.style.display = "flex"
}








