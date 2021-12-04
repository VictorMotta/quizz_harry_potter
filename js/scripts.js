// Declaração de Variáveis 
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas

const questions = [
    {
        "question":"Quando Harry Potter nasceu?",
        "answers": [
            {
                "answer": "1 de julho, 1980",
                "correct": false
            },
            {
                "answer": "31 de julho, 1980",
                "correct": true
            },
            {
                "answer": "1 de agosto, 1980",
                "correct": false
            },
            {
                "answer": "31 de agosto, 1980",
                "correct": false
            },
        ]
    },
    {
        "question":"Qual destes Weasley é o mais velho?",
        "answers": [
            {
                "answer": "Carlinhos",
                "correct": false
            },
            {
                "answer": "Percy",
                "correct": false
            },
            {
                "answer": "Gui",
                "correct": true
            },
            {
                "answer": "Ron",
                "correct": false
            },
        ]
    },
    {
        "question":"Qual Horcrux foi a segunda a ser destruída?",
        "answers": [
            {
                "answer": "O diadema",
                "correct": false
            },
            {
                "answer": "A taça",
                "correct": false
            },
            {
                "answer": "O medalhão",
                "correct": false
            },
            {
                "answer": "O anel",
                "correct": true
            },
        ]
    },
    {
        "question":"Qual é o nome completo de Alvo Dumbledore?",
        "answers": [
            {
                "answer": "Alvo Percival Wulfrico Brian Dumbledore",
                "correct": true
            },
            {
                "answer": "Alvo Brian Percival Wulfrico Dumbledore",
                "correct": false
            },
            {
                "answer": "Alvo Wulfrico Percival Brian Dumbledore",
                "correct": false
            },
            {
                "answer": "Severo Alvo Brian Percival Drumbledore",
                "correct": false
            },
        ]
    },
    {
        "question":"Qual é o patrono de Luna Lovegood?",
        "answers": [
            {
                "answer": "Uma Lebre",
                "correct": true
            },
            {
                "answer": "Um Rato",
                "correct": false
            },
            {
                "answer": "Um Gato",
                "correct": false
            },
            {
                "answer": "Uma Joaninha",
                "correct": false
            },
        ]
    },
    {
        "question":"Qual destes ingredientes NÃO é utilizado para fazer uma poção Polissuco?",
        "answers": [
            {
                "answer": "Sanguessuga",
                "correct": false
            },
            {
                "answer": "Descurainia",
                "correct": false
            },
            {
                "answer": "Agapanto",
                "correct": true
            },
            {
                "answer": "Hemeróbio",
                "correct": false
            },
        ]
    },

]

// Subistituição do quizz para a primeira pergunta
function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Altera o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

        // Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer']

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // remove hide e template class

        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });


    });

    // Incrementar o número da questão

    actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {
    
    // seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer");

            // checa se o usuário acertou a pergunta
            if(btn === button){
                //incrementa o ponto
                points++;
            }

        } else {

            button.classList.add("wrong-answer");

        }


    });

    // Exibir próxima pergunta
    nextQuestion();

}

// Exibie a próxima pergunta no quizz
function nextQuestion() {
    
    //timer para usuário ver as respostas
    setTimeout(function() {

        //verifica se ainda tem perguntas
        if(actualQuestion >= questions.length){
            // apresenta a msg de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 500);


}

// Exibe a tela Final
function showSuccessMessage()   {

    hideOrShowQuizz();

    // Trocar dados da tela de sucesso

    // Calcular o Score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // Altera o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // Altera a quantidade de perguntas do Quizz
    const qtdAnswers = document.querySelector("#questions-qty");
    qtdAnswers.textContent = questions.length;


}

function hideOrShowQuizz(){

    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");

}

//Reinciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function(){

    //zerar o jogo 
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init()

});

// Inicialização do Quizz
init();