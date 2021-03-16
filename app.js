const questions = [];
const answers = [];
const incorrect = [];
const endgame = document.getElementById("endgame")
const game = document.getElementById("quiz")
const question = document.getElementById("q");
const main = document.getElementById("main");
const quiz = document.querySelectorAll("li");
const qCount = document.getElementById("count");
const finalScore = document.getElementById("finalScore")
let questionCount = 0;
let correctCounter = 0;
let answer = answers[questionCount]


window.onload = loadData()


async function loadData() {
const response = await fetch("https://opentdb.com/api.php?amount=10&encode=url3986")
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
                score()
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
    correctCounter+=1
    finalScore.innerText = "Final Score:" + correctCounter + "/10"

}

const count = () => {
    questionCount +=1
    qCount.innerText = questionCount + "/10"
    endGame();
}


// const timer = () => {
    
// }



const endGame = () => {
    if (questionCount === 10) {
        game.style.display = "none"
        endgame.style.display = "flex"
    }
}


const retry = () => {
    endgame.style.display ="none"
    main.style.display = "flex"
}




