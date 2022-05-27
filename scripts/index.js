const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');


const popupEditForm = page.querySelector('#edit-form');
const popupAddForm = page.querySelector('#add-form');


const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

const nameInput = page.querySelector('#name-input');
const jobInput = page.querySelector('#job-input');

const cardNameInput = page.querySelector('#card-name-input');
const cardLinkInput = page.querySelector('#card-link-input');

const textName = page.querySelector('.profile__info-name');
const textJob = page.querySelector('.profile__info-descript');


const elementsGridContainer = page.querySelector('.elements-grid__list');
const elementsGridTemplate = document.getElementById('elements-grid__item-template').content;

function addCardToList(cardsList) {

  const cardElement = elementsGridTemplate.querySelector('.elements-grid__item').cloneNode(true);
  const elementsGridImage = cardElement.querySelector('.elements-grid__image');
  const elementsGridPlaceName = cardElement.querySelector('.elements-grid__place-name');

  elementsGridImage.setAttribute('src', cardsList.link);
  elementsGridImage.setAttribute('alt', cardsList.name);
  elementsGridPlaceName.textContent = cardsList.name;

  const buttonLike = cardElement.querySelector('.elements-grid__like');
  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements-grid__like_active');
  });

  const buttonDelete = cardElement.querySelector('.elements-grid__delete');
  buttonDelete.addEventListener('click', function(evt) {
    cardElement.remove();
  });

  const popupShowImage = page.querySelector('.popup_show_image');
  const popupImageLink = popupShowImage.querySelector('.popup__full-image');
  const popupPlaceName = popupShowImage.querySelector('.popup__caption');

  elementsGridImage.addEventListener('click', function() {
  popupImageLink.setAttribute('src', cardsList.link);
    popupImageLink.setAttribute('alt', cardsList.name);
    popupPlaceName.textContent = cardsList.name;

    openPopup(popupShowImage);
  });

  elementsGridContainer.prepend(cardElement);
}
function initialCards(cardsList=[]) {
  cardsList.forEach(function (item) {
    addCardToList(item);
  })
}

initialCards(cardsList);

function setInputValue() {
  nameInput.value = textName.textContent;
  jobInput.value = textJob.textContent;
}

function openPopup(popupId) {
  popupId.classList.add('popup_opened');
}

function openForm(popupId) {
  openPopup(popupId);
  setInputValue();
}


const popup = page.querySelectorAll('.popup');

function closeEventClick(popup) {
  popup.classList.remove('popup_opened');
}
function closePopup(popup) {
  const buttonClose = popup.querySelector('.popup__button-close');
  buttonClose.addEventListener('click', function() {
    closeEventClick(popup);
  });
}

closePopup(popup[0]);
closePopup(popup[1]);
closePopup(popup[2]);


function handleSaveForm(e) {
  e.preventDefault();
  textName.textContent = nameInput.value;
  textJob.textContent = jobInput.value;
  closeEventClick(popup[0]);
}

function handleAddCardButton(e) {
  e.preventDefault();
  addCardToList(cardNameInput.value, cardLinkInput.value);
  closeEventClick(popup[1]);
}

popupEditForm.addEventListener('submit', handleSaveForm);
buttonAddCard.addEventListener('click', handleAddCardButton);


function openFormClick(buttonName, formName) {
  buttonName.addEventListener( 'click', function() {
    openForm(formName);
  }, false);
}

openFormClick(buttonEdit, popupEditForm);
openFormClick(buttonAdd, popupAddForm);
