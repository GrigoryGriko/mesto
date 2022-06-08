const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');

const popupsList = {
  popupEditData: page.querySelector('.popup_edit_data'),
  popupAddCard: page.querySelector('.popup_add_card'),
  popupShowImage: page.querySelector('.popup_show_image')
};

const popupContainer = popupsList.popupAddCard.querySelector('.popup__container');

const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

const nameInput = page.querySelector('#name-input');
const jobInput = page.querySelector('#job-input');


const textName = page.querySelector('.profile__info-name');
const textJob = page.querySelector('.profile__info-descript');


const elementsGridContainer = page.querySelector('.elements-grid__list');
const elementsGridTemplate = document.getElementById('elements-grid__item-template').content;
qwerty();

function deleteCard(evt) {
  evt.target.closest('.elements-grid__item').remove();
}
function putLike(evt) {
  evt.target.classList.toggle('elements-grid__like_active');
}

function createCard(cardsList) {

  const cardElement = elementsGridTemplate.querySelector('.elements-grid__item').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements-grid__image');
  const cardPlaceName = cardElement.querySelector('.elements-grid__place-name');

  cardElementImage.setAttribute('src', cardsList.link);
  cardElementImage.setAttribute('alt', cardsList.name);
  cardPlaceName.textContent = cardsList.name;

  const buttonLike = cardElement.querySelector('.elements-grid__like');
  buttonLike.addEventListener('click', putLike);

  const buttonDelete = cardElement.querySelector('.elements-grid__delete');
  buttonDelete.addEventListener('click', deleteCard);

  const popupImageLink = popupsList.popupShowImage.querySelector('.popup__full-image');
  const popupPlaceName = popupsList.popupShowImage.querySelector('.popup__caption');

  cardElementImage.addEventListener('click', function() {
    popupImageLink.setAttribute('src', cardsList.link);
    popupImageLink.setAttribute('alt', cardsList.name);
    popupPlaceName.textContent = cardsList.name;

    openPopup(popupsList.popupShowImage);
  });

  return cardElement;
}
function renderCard(cardData) {
  elementsGridContainer.prepend( createCard(cardData) );
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
  if (popupOpened) {
    if (evt.code === 'Escape') {
      closePopup(popupOpened);
    }
  }
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

  popupContainer.reset();
  lockButton(buttonAddCard, elementsDocument.inactiveButtonClass);
}

popupsList.popupEditData.addEventListener('submit', handleSaveForm);
popupsList.popupAddCard.addEventListener('submit', handleAddCardButton);

buttonEdit.addEventListener( 'click', function() {
  setInputValue();
  openPopup(popupsList.popupEditData);
}, false);

buttonAdd.addEventListener( 'click', function() {
  openPopup(popupsList.popupAddCard);
}, false);
