import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { getUserName } from './welcomePage.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
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
