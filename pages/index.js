import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cardsList, elementsDocument, page, buttonEdit, buttonAdd, popupsListSelector, formElementSelector,
  textNameSelector, textJobSelector, elementsGridContainer} from '../utils/constants.js';

import  {handleSaveForm, handleAddCardButton, createCard} from '../utils/utils.js';



const cardList = new Section({
  items: cardsList,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, elementsGridContainer);

cardList.renderItems();


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


buttonEdit.addEventListener( 'click', function() {
  editData.open();
}, false);

buttonAdd.addEventListener( 'click', function() {
  addCard.open();
}, false);


export {userInfo, editData, addCard, formListValidation, cardList};
