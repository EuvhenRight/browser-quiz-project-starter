import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { getUserName } from './welcomePage.js';
import { changeProgress } from '../views/progressBar.js';


export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];


  const questionElement = createQuestionElement(currentQuestion.text, quizData.currentQuestionIndex + 1, currentQuestion.image);


  correctAnswerKey = currentQuestion.correct;
  

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);

    answerElement.setAttribute('data-key', key);
    answerElement.addEventListener('click', selectAnswer)
  }

// this code disabled and active button
  document
  .getElementById(NEXT_QUESTION_BUTTON_ID)
  .setAttribute('disabled', true)

  
  const currentBar = changeProgress((quizData.currentQuestionIndex * 10)+10); // Progressbar line
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
  
  // Flag for not selecting two items
  quizData.answerSelected = false;
};

let correctAnswerKey;

const selectAnswer = (event) => {
  if (quizData.answerSelected) {
    return;
  }
  
    const selectedListItem = event.target;
    const userAnswer = selectedListItem.dataset.key;
    const happyMario = document.querySelector('.happy-mario')
    const sadMario = document.querySelector('.sad-mario')

    quizData.answerSelected = true;

    if (userAnswer === correctAnswerKey) {
     selectedListItem.classList.add('yes')
     happyMario.classList.add('hello-happy-mario')
    } else {
     selectedListItem.classList.add('no')
     sadMario.classList.add('hello-sad-mario')
     
     showCorrectAnswer()
    }
    
    document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .removeAttribute('disabled')
  
};

const showCorrectAnswer = () => {
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  const answerElements = answersListElement.querySelectorAll('li');

  answerElements.forEach((answerElement) => {
    const answerKey = answerElement.dataset.key;

    if (answerKey === correctAnswerKey) {
      answerElement.classList.add('yes');
    }
  });
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  // After the last question it shows the name of the User and scores

  if (quizData.currentQuestionIndex === quizData.questions.length) {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';

    const userName = getUserName();

    const finalMessage = document.createElement('div');
    finalMessage.innerText = `Well done, ${userName}! You earned ${quizData.score} points.`;

    // New Game button

     const newGameButton = document.createElement('button');
    newGameButton.innerText = 'New Game';
    newGameButton.addEventListener('click', startNewGame);
    newGameButton.classList.add("button-style")
    finalMessage.appendChild(newGameButton);


    userInterface.appendChild(finalMessage);
  } else {
    initQuestionPage();
  }
};

const startNewGame = () => {
  // Reset the quiz data and start a new game
  quizData.currentQuestionIndex = 0;
  quizData.score = 0;
  initQuestionPage();
};