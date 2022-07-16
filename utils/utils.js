import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';

import {page, popupsListSelector,  selectorGridTemplate, fullImageSelector, captionImageSelector} from './constants.js';

import {userInfo, editData, addCard, formListValidation, cardList} from '../pages/index.js';



export function handleCardClick({name, link}) {
  const popupWithImage = new PopupWithImage(popupsListSelector.popupShowImageSelector, fullImageSelector, captionImageSelector, name, link);
  popupWithImage.open();
}

export function handleSaveForm({nameInput, jobInput}) {
  userInfo.setUserInfo({nameInput, jobInput});

  editData.close();

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInput: name, linkInput: link}) {
  const cardUser = new Card({name, link}, selectorGridTemplate, handleCardClick);
  const elementCardUser = cardUser.generateCard();
  cardList.addItem(elementCardUser);

  addCard.close();

  formListValidation['form-add-card'].lockButton();
}
