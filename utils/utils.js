import Card from '../components/Card.js';

import {selectorGridTemplate} from './constants.js';

import {userInfo, editData, addCard, formListValidation, cardSection, popupWithImage} from '../pages/index.js';


export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}

export function handleSaveForm({nameInput, jobInput}) {
  userInfo.setUserInfo({nameInput, jobInput});

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
