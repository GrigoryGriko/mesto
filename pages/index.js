import {Card} from '../components/Cards.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  cardsList, elementsDocument, page, buttonEdit, buttonAdd, popupsList, popupContainerEditData,
  popupContainerAddCard, popupImageLink, popupPlaceName, nameInput, jobInput, textName,
  textJob, elementsGridContainer, selectorGridTemplate
} from '../utils/constants.js';

/*function createCard(cardData) {*/

const CardList = new Section({
  data: data,
  renderer: (item) => {
    const card = new Card(cardData, selectorGridTemplate, hadleOpenViewPopup);
    const elementCard = card.generateCard();

    CardList.addItem(elementCard);
  }
}, elementsGridContainer);
//переписать создание экземпляра класса


/*function renderCard(cardData) {
  elementsGridContainer.prepend(createCard(cardData));
}   //в class Section в addItems()


function initialCards(cardsList=[]) {
  cardsList.forEach(function (item) {
    renderCard(item);
  })
}   //в class Section в renderItems()*/

initialCards(cardsList);

function setInputValue() {
  nameInput.value = textName.textContent;
  jobInput.value = textJob.textContent;
}

function handlePressEscape(evt) {
  if (evt.code === 'Escape') {
    const popupOpened = page.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleOpenViewPopup({name, link}) {


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

function setEventClosePopup() {
  document.querySelectorAll('.popup').forEach( popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup || evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      };
    });
  });
}

setEventClosePopup();


function handleSaveForm(e) {
  e.preventDefault();
  textName.textContent = nameInput.value;
  textJob.textContent = jobInput.value;
  closePopup(popupsList.popupEditData);

  validatorEditData.lockButton();
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
  validatorAddCard.lockButton();
}


popupContainerEditData.addEventListener('submit', handleSaveForm);
popupContainerAddCard.addEventListener('submit', handleAddCardButton);


buttonEdit.addEventListener( 'click', function() {
  validatorEditData.resetValidation();

  setInputValue();
  openPopup(popupsList.popupEditData);
}, false);

buttonAdd.addEventListener( 'click', function() {
  validatorAddCard.resetValidation();
  openPopup(popupsList.popupAddCard);
}, false);


const validatorEditData = new FormValidator(elementsDocument, popupContainerEditData);
validatorEditData.enableValidation();

const validatorAddCard = new FormValidator(elementsDocument, popupContainerAddCard);
validatorAddCard.enableValidation();
