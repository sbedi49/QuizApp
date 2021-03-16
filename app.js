const questions = [];
const answers = [];
const incorrect = [];
const question = document.getElementById("q");
const main = document.getElementById("main");
const quiz = document.querySelectorAll("li");
const qCount = document.getElementById("count");
let questionCount = 0;



function onClick() {
fetch("https://opentdb.com/api.php?amount=1")
.then(response => response.json())
.then (data => {
    data.results.forEach(
        q => {
            questions.push(q.question)
            answers.push(q.correct_answer)
            incorrect.push(q.incorrect_answers)
        })
})
startGame()

}

const startGame = () => {
    let randomNum = Math.floor(Math.random() * 3) + 1
    question.innerText = questions[0];
    quiz[randomNum].innerText = answers[0]
    count()

    for (let i = 0; i < quiz.length; i++) {
        if (!(quiz[i].innerText === answers[0])) {
            quiz[i].innerText = incorrect[0][i]
        }
    }
    

    quiz.forEach(item => {item.addEventListener("click",
            () => {
            if ((item.innerText === answers[0])) {
                alert("correct")
                score();
                count()
               
            }
            else {
                alert("incorrect")
              
            }
        }
            )

        }
    )
    
}

const score = () => {
    score+=1
}

const count = () => {
    questionCount +=1
    qCount.innerText = questionCount + "/10"
}


// const timer = () => {
    
// }


// const endGame = () => {
    
// }

