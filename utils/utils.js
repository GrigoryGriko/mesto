import Card from '../components/Card.js';

import {selectorGridTemplate, userAvatarSelector, userNameSelector, userAboutSelector } from './constants.js';

import {userInfo, editData, addCard, formListValidation, cardSection, popupWithImage, api} from '../pages/index.js';
import Api from '../components/Api.js';


export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}

export function initUserData() {  //не нужна
  api.getInitial('users/me')    //инициализация данных пользователя
  .then((userData) => {
    userInfo.setUserInfo({name: userData.name, about: userData.about});
  })
  .catch((err) => {
    console.log(`Ошибка инициализации данных пользователя ${err}`);
  });
}

export function initUserAvatar() {
  api.getInitial('users/me')    //инициализация аватара пользователя
  .then((userData) => {
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.log(`Ошибка инициализации аватара пользователя ${err}`);
  });
}

export function handleSaveForm({nameInput, jobInput}) {
  api.editDataUser('users/me', {nameInput, jobInput})
  .then((userData) => {
    userInfo.setUserInfo({name: userData.name, about: userData.about});
  })
  .catch((err) => {
    console.log(`Ошибка изменения данных пользователя ${err}`);
  });

  //initUserData();


  //userInfo.setUserInfo({nameInput, jobInput});

  editData.close();

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  cardSection.addItem( createCard({name, link}) );

  addCard.close();

  formListValidation['form-add-card'].lockButton();
}

export function createCard({name, link}) {
  const card = new Card({name, link}, selectorGridTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
