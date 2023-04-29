import { quizData } from '../data.js';
import { ANSWERS_LIST_ID } from '../constants.js';

export const showInformation = (text) => {
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  
    // const questionTexts = quizData.questions.map(question => question.info).join(' ');

    const infoArray = quizData.questions.map((question) => {
      if (question.text.includes(text)) {
          return question.info;
      }
  }).join(' ');
      
    const questionImageContainer = document.querySelector('.question-image-container');
    const informationView = document.createElement('div');
    informationView.classList.add('hint');
  
       informationView.innerText = `${infoArray}`;
       questionImageContainer.appendChild(informationView);
  }
