import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  elementsDocument, page, buttonEdit, buttonAdd, buttonUpdateAvatar, popupsListSelector,
  formElementSelector, textNameSelector, textJobSelector, elementsGridContainer,
  fullImageSelector, captionImageSelector, userAvatarSelector
} from '../utils/constants.js';

import  {
  handleSaveForm, handleAddCardButton, createCard, handleDeleteCard,
  handleUpdateAvatar
} from '../utils/utils.js';


export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  keyAuth: '110d7e44-821c-45aa-84e8-91b557d72ac5'
}

const api = new Api(config);

const cardSection = new Section(
  (cardsList) => {
    const allCardNodes = cardsList.reverse().map((item) => {
      return createCard(item);
    });
    cardSection.addItem(...allCardNodes);
  } , elementsGridContainer);

Promise.all([api.getInitCards(), api.getInitUserData()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);

    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных пользователя ${err}`);
  });

const formListValidation = {};
Array.from(page.querySelectorAll(formElementSelector)).forEach((item) => {
  formListValidation[item.name] = new FormValidator(elementsDocument, item);
  formListValidation[item.name].enableValidation();
});


const userInfo = new UserInfo({textNameSelector, textJobSelector, userAvatarSelector});

const dataEdit = new PopupWithForm(
  popupsListSelector.popupEditDataSelector, formElementSelector,
  handleSaveForm, formListValidation['form-edit-info'].resetValidation,
  {
    buttonSubmitSelector: elementsDocument.submitButtonSelector,
    textButtonDefault: 'Сохранить', textButtonLoader:'Сохранение...'
  }, userInfo.getUserInfo
);
dataEdit.setEventListeners();


const cardAdd = new PopupWithForm(
  popupsListSelector.popupAddCardSelector, formElementSelector,
  handleAddCardButton, formListValidation['form-add-card'].resetValidation,
  {
    buttonSubmitSelector: elementsDocument.submitButtonSelector,
    textButtonDefault: 'Создать', textButtonLoader:'Создание...'
  }
);
cardAdd.setEventListeners();


const avatarUpdate = new PopupWithForm(
  popupsListSelector.popupUpdateAvatarSelector, formElementSelector,
  handleUpdateAvatar, formListValidation['form-update-avatar'].resetValidation,
  {
    buttonSubmitSelector: elementsDocument.submitButtonSelector,
    textButtonDefault: 'Сохранить', textButtonLoader:'Сохранение...'
  }
)
avatarUpdate.setEventListeners();


export const confirmDeleteCard = new PopupWithConfirmation(
  popupsListSelector.popupDeleteCardSelector, formElementSelector,
  handleDeleteCard,
  {
    buttonSubmitSelector: elementsDocument.submitButtonSelector,
    textButtonDefault: 'Да', textButtonLoader:'Удаление...'
  }
);
confirmDeleteCard.setEventListeners();


export const popupWithImage = new PopupWithImage(
  popupsListSelector.popupShowImageSelector,
  fullImageSelector, captionImageSelector
);
popupWithImage.setEventListeners();


buttonEdit.addEventListener( 'click', function() {
  dataEdit.open();
}, false);

buttonAdd.addEventListener( 'click', function() {
  cardAdd.open();
}, false);

buttonUpdateAvatar.addEventListener( 'click', function() {
  avatarUpdate.open();
}, false);


export {userInfo, dataEdit, cardAdd, avatarUpdate, formListValidation, cardSection, api};
