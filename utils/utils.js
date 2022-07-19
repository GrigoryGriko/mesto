import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';

import {popupsListSelector,  selectorGridTemplate, fullImageSelector, captionImageSelector} from './constants.js';

import {userInfo, editData, addCard, formListValidation, cardList} from '../pages/index.js';


export function handleCardClick({name, link}) {
  const popupWithImage = new PopupWithImage(popupsListSelector.popupShowImageSelector, fullImageSelector, captionImageSelector);
  popupWithImage.setEventListeners();
  popupWithImage.open(name, link);
}

export function handleSaveForm({nameInput, jobInput}) {
  userInfo.setUserInfo({nameInput, jobInput});

  editData.close();

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  cardList.addItem( createCard({name, link}) );

  addCard.close();

  formListValidation['form-add-card'].lockButton();
}

export function createCard({name, link}) {
  const card = new Card({name, link}, selectorGridTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
