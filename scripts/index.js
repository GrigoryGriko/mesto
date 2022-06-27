import {cardsList, Card} from './Cards.js';


const elementsDocument = {
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible',
  errorModifier: 'popup__input-error_extender_form'
};


const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');

const popupsList = {
  popupEditData: page.querySelector('.popup_edit_data'),
  popupAddCard: page.querySelector('.popup_add_card'),
  popupShowImage: page.querySelector('.popup_show_image')
};

const popupContainerEditData = popupsList.popupEditData.querySelector('.popup__container');
const popupContainerAddCard = popupsList.popupAddCard.querySelector('.popup__container');


const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

const nameInput = page.querySelector('#name-input');
const jobInput = page.querySelector('#job-input');


const textName = page.querySelector('.profile__info-name');
const textJob = page.querySelector('.profile__info-descript');


const elementsGridContainer = page.querySelector('.elements-grid__list');
const elementsGridTemplate = document.getElementById('elements-grid__item-template').content;


function renderCard(cardData) {
  const card = new Card(cardData, elementsGridTemplate, handleOpenViewPopup);
  const elementCard = card.generateCard();

  elementsGridContainer.prepend(elementCard);
}


function initialCards(cardsList=[]) {
  cardsList.forEach(function (item) {
    renderCard(item);
  })
}

initialCards(cardsList);

function setInputValue() {
  nameInput.value = textName.textContent;
  jobInput.value = textJob.textContent;
}

function handlePressEscape(evt) {
  const popupOpened = page.querySelector('.popup_opened');
  if (evt.code === 'Escape') {
    closePopup(popupOpened);
  }
}


function handleOpenViewPopup({name, link}) {
  const popupImageLink = popupsList.popupShowImage.querySelector('.popup__full-image');
  const popupPlaceName = popupsList.popupShowImage.querySelector('.popup__caption');

  popupImageLink.setAttribute('src', link);
  popupImageLink.setAttribute('alt', name);
  popupPlaceName.textContent = name;

  openPopup(popupsList.popupShowImage);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEscape);
}


function setEventClickOverlay(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}
function setEventClickClose(popup) {
  const buttonClose = popup.querySelector('.popup__button-close');
  buttonClose.addEventListener('click', function() {
    closePopup(popup);
  });
}

function setEventClosePopup(popup) {
  setEventClickClose(popup);
  setEventClickOverlay(popup);
}


setEventClosePopup(popupsList.popupEditData);
setEventClosePopup(popupsList.popupAddCard);
setEventClosePopup(popupsList.popupShowImage);


function handleSaveForm(e) {
  e.preventDefault();
  textName.textContent = nameInput.value;
  textJob.textContent = jobInput.value;
  closePopup(popupsList.popupEditData);

  lockButton(buttonSave, elementsDocument.inactiveButtonClass);
}

function handleAddCardButton(e) {
  e.preventDefault();

  const cardInput = {
    name: page.querySelector('#card-name-input').value,
    link: page.querySelector('#card-link-input').value
  };

  renderCard(cardInput);
  closePopup(popupsList.popupAddCard);

  popupContainerAddCard.reset();
  lockButton(buttonAddCard, elementsDocument.inactiveButtonClass);
}

popupsList.popupEditData.addEventListener('submit', handleSaveForm);
popupsList.popupAddCard.addEventListener('submit', handleAddCardButton);


buttonEdit.addEventListener( 'click', function() {
  hideInputError(elementsDocument, popupContainerEditData);  // nameInput
  hideInputError(elementsDocument, popupContainerEditData);  //jobInput

  setInputValue();
  openPopup(popupsList.popupEditData);
}, false);

buttonAdd.addEventListener( 'click', function() {
  openPopup(popupsList.popupAddCard);
}, false);


const validatorNameInput = new FormValidator(elementsDocument, nameInput);
validatorNameInput.enableValidation();

const validatorJobInput = new FormValidator(elementsDocument, jobInput);
validatorJobInput.enableValidation();

const validatorLinkInput = new FormValidator(elementsDocument, page.querySelector('#card-link-input'));
validatorLinkInput.enableValidation();

const validatorNameInput = new FormValidator(elementsDocument, page.querySelector('#card-name-input'));
validatorNameInput.enableValidation();
