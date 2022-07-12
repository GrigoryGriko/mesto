import {Card} from '../components/Cards.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  cardsList, elementsDocument, page, buttonEdit, buttonAdd, popupsListSelector, popupContainerEditData,
  popupContainerAddCard, fullImage, captionImage, nameInput, jobInput, textName,
  textJob, elementsGridContainer, selectorGridTemplate
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';

const cardList = new Section({
  items: cardsList,
  renderer: (item) => {
    const card = new Card(item, selectorGridTemplate, handleCardClick);
    const elementCard = card.generateCard();

    cardList.addItem(elementCard);
  }
}, elementsGridContainer);

cardList.renderItems();


function setInputValue() {
  nameInput.value = textName.textContent;
  jobInput.value = textJob.textContent;
}

/*function handlePressEscape(evt) {   //popup
  if (evt.code === 'Escape') {
    const popupOpened = page.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}*/

function handleCardClick({name, link}) {
  const popupWithImage = new PopupWithImage(popupsListSelector.popupShowImageSelector, fullImage, captionImage, name, link);
  popupWithImage.open();
}

/*function openPopup(popup) {   //popup
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEscape);
}

function closePopup(popup) {   //popup
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEscape);
}

function setEventClosePopup() {   //popup
  document.querySelectorAll('.popup').forEach( popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup || evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      };
    });
  });
}

setEventClosePopup();
*/

/*function handleSaveForm(e) {    //PopupWithForm
  e.preventDefault();
  textName.textContent = nameInput.value;
  textJob.textContent = jobInput.value;
  closePopup(popupsListSelector.popupEditData);

  validatorEditData.lockButton();
}*/

function handleAddCardButton(e) {
  e.preventDefault();

  const cardInput = {
    name: page.querySelector('#card-name-input').value,
    link: page.querySelector('#card-link-input').value
  };

  renderCard(cardInput);
  closePopup(popupsListSelector.popupAddCard);

  popupContainerAddCard.reset();
  validatorAddCard.lockButton();
}


//popupContainerEditData.addEventListener('submit', handleSaveForm);    //PopupWithForm
popupContainerAddCard.addEventListener('submit', handleAddCardButton);

const editData = new PopupWithForm(   //PopupWithForm
  popupsListSelector.popupEditDataSelector,
  (e) => {
    e.preventDefault();

    editData._getInputValues();
    editData.close();

    validatorEditData.lockButton();   //возможно экземпляр validatorEditData надо передавать параметром
  }
);

/*const CardList = new Section({
  items: cardsList,
  renderer: (item) => {
    const card = new Card(item, selectorGridTemplate, handleCardClick);
    const elementCard = card.generateCard();

    CardList.addItem(elementCard);
  }
}, elementsGridContainer);*/


buttonEdit.addEventListener( 'click', function() {
  validatorEditData.resetValidation();

  setInputValue();   //наверное событие клика привязывать в классе, а validatorEditData как-то привязывать к нему
  editData.open();
  //openPopup(popupsListSelector.popupEditData);
}, false);

buttonAdd.addEventListener( 'click', function() {
  validatorAddCard.resetValidation();
  openPopup(popupsListSelector.popupAddCard);
}, false);


const validatorEditData = new FormValidator(elementsDocument, popupContainerEditData);
validatorEditData.enableValidation();

const validatorAddCard = new FormValidator(elementsDocument, popupContainerAddCard);
validatorAddCard.enableValidation();
