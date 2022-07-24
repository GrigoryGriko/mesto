import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  cardsList, elementsDocument, page, buttonEdit, buttonAdd, popupsListSelector,
  formElementSelector, textNameSelector, textJobSelector, elementsGridContainer,
  fullImageSelector, captionImageSelector, selectorGridTemplate
} from '../utils/constants.js';

import  {handleSaveForm, handleAddCardButton, createCard, handleCardClick} from '../utils/utils.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/cards',
  headers: {
    authorization: '110d7e44-821c-45aa-84e8-91b557d72ac5'
  }
});

api.getInitialCards()
  .then((cardsList) => {
    const cardList = new Section({
      items: cardsList,
      renderer: () => {
        const allCardNodes = cardsList.reverse().map((item) => {
          return createCard(item);
        });
        cardList.addItem(...allCardNodes);
      }
    }, elementsGridContainer);

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка загрузки карточек ${err}`);
  });

/*const cardList = new Section({
  items: cardsList,
  renderer: () => {
    const allCardNodes = cardsList.reverse().map((item) => {
      return createCard(item);
    });
    cardList.addItem(...allCardNodes);
  }
}, elementsGridContainer);

cardList.renderItems();*/


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


export {userInfo, editData, addCard, formListValidation/*, cardList*/};
