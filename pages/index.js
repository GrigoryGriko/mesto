import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  elementsDocument, page, buttonEdit, buttonAdd, popupsListSelector,
  formElementSelector, textNameSelector, textJobSelector, elementsGridContainer,
  fullImageSelector, captionImageSelector, selectorGridTemplate, userAvatarSelector, 
  userNameSelector, userAboutSelector 
} from '../utils/constants.js';

import  {handleSaveForm, handleAddCardButton, createCard, handleCardClick} from '../utils/utils.js';



const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  headers: {
    authorization: '110d7e44-821c-45aa-84e8-91b557d72ac5'
  }
}

const api = new Api(config);


const cardSection = new Section(    //инициализация карточек
  (cardsList) => {
    const allCardNodes = cardsList.reverse().map((item) => {
      return createCard(item);
    });
    cardSection.addItem(...allCardNodes);
  } , elementsGridContainer);


api.getInitial('cards')
  .then((cardsList) => {
    cardSection.renderItems(cardsList);
  })
  .catch((err) => {
    console.log(`Ошибка загрузки карточек ${err}`);
  });

api.getInitial('users/me')    //инициализация данных пользователя
  .then((userData) => {
    document.querySelector(userAvatarSelector).setAttribute('src', userData.avatar);
    document.querySelector(userAvatarSelector).setAttribute('alt', 'аватарка');

    document.querySelector(userNameSelector).textContent = userData.name;
    document.querySelector(userAboutSelector).textContent = userData.about;
  })
  .catch((err) => {
    console.log(`Ошибка инициализации данных пользователя ${err}`);
  });

const formListValidation = {};
Array.from(page.querySelectorAll(formElementSelector)).forEach((item) => {
  formListValidation[item.name] = new FormValidator(elementsDocument, item);
  formListValidation[item.name].enableValidation();
});

const userInfo = new UserInfo({textNameSelector, textJobSelector});

const editData = new PopupWithForm(
  popupsListSelector.popupEditDataSelector, formElementSelector,
  handleSaveForm, formListValidation['form-edit-info'].resetValidation, userInfo.getUserInfo
);
editData.setEventListeners();


const addCard = new PopupWithForm(
  popupsListSelector.popupAddCardSelector, formElementSelector,
  handleAddCardButton, formListValidation['form-add-card'].resetValidation
);
addCard.setEventListeners();


export const popupWithImage = new PopupWithImage(popupsListSelector.popupShowImageSelector, fullImageSelector, captionImageSelector);
popupWithImage.setEventListeners();


buttonEdit.addEventListener( 'click', function() {
  editData.open();
}, false);

buttonAdd.addEventListener( 'click', function() {
  addCard.open();
}, false);


export {userInfo, editData, addCard, formListValidation, cardSection};
