import Card from '../components/Card.js';

import {selectorGridTemplate, userAvatarSelector, userNameSelector, userAboutSelector } from './constants.js';

import {userInfo, editData, addCard, formListValidation, cardSection, popupWithImage, api} from '../pages/index.js';


export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}


export function handleSaveForm({nameInput, jobInput}) {
  api.editDataUser('users/me', {nameInput, jobInput})
  .then(({name, about}) => {
    userInfo.setUserInfo({name, about});
  })
  .catch((err) => {
    console.log(`Ошибка изменения данных пользователя ${err}`);
  });


  editData.close();

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  api.addCard('cards', {name, link})
    .then(({name, link}) => {
      cardSection.addItem( createCard({name, link}) );
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    });

  addCard.close();

  formListValidation['form-add-card'].lockButton();
}

export function createCard({name, link}) {
  const card = new Card({name, link}, selectorGridTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
