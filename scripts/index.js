const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');


const popupEditData = page.querySelector('.popup_edit_data');
const popupAddCard = page.querySelector('.popup_add_card');
const popupShowImage = page.querySelector('.popup_show_image');

const popupsArray = [popupEditData, popupAddCard, popupShowImage];

const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

const nameInput = page.querySelector('#name-input');
const jobInput = page.querySelector('#job-input');


const textName = page.querySelector('.profile__info-name');
const textJob = page.querySelector('.profile__info-descript');


const elementsGridContainer = page.querySelector('.elements-grid__list');
const elementsGridTemplate = document.getElementById('elements-grid__item-template').content;


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

  const popupImageLink = popupShowImage.querySelector('.popup__full-image');
  const popupPlaceName = popupShowImage.querySelector('.popup__caption');

  cardElementImage.addEventListener('click', function() {
    popupImageLink.setAttribute('src', cardsList.link);
    popupImageLink.setAttribute('alt', cardsList.name);
    popupPlaceName.textContent = cardsList.name;

    openPopup(popupShowImage);
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closeEventClick(popup) {
  popup.classList.remove('popup_opened');
}

function setEventClickOverlay(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closeEventClick(popup);
    }
  });
}
function setEventClickClose(popup) {
  const buttonClose = popup.querySelector('.popup__button-close');
  buttonClose.addEventListener('click', function() {
    closeEventClick(popup);
  });
}
function setEventPressEscape(popup) {
  document.addEventListener('keydown', (evt) => {
    popupsArray.find((item) => {
      if (item.classList.contains('popup_opened') && evt.code === 'Escape') {
        item.classList.contains('popup_opened') ? closeEventClick(popup) : false;
      }
    });   /*рефакторим и добавим именованный колбэк для снятия слушателя*/
  });
}

function closePopup(popup) {
  setEventClickClose(popup);
  setEventClickOverlay(popup);
  setEventPressEscape(popup);
}


closePopup(popupEditData);
closePopup(popupAddCard);
closePopup(popupShowImage);


function handleSaveForm(e) {
  e.preventDefault();
  textName.textContent = nameInput.value;
  textJob.textContent = jobInput.value;
  closeEventClick(popupEditData);
}

function handleAddCardButton(e) {
  e.preventDefault();

  const cardInput = {
    name: page.querySelector('#card-name-input').value,
    link: page.querySelector('#card-link-input').value
  };

  renderCard(cardInput);
  closeEventClick(popupAddCard);

  popupAddCard.querySelector('.popup__container').reset();
}

popupEditData.addEventListener('submit', handleSaveForm);
popupAddCard.addEventListener('submit', handleAddCardButton);

buttonEdit.addEventListener( 'click', function() {
  setInputValue();
  openPopup(popupEditData);
}, false);

buttonAdd.addEventListener( 'click', function() {
  openPopup(popupAddCard);
}, false);
