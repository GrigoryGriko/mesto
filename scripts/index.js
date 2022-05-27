const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');


const popupEditForm = page.querySelector('#edit-form');
const popupAddForm = page.querySelector('#add-form');

const popupContainer = page.querySelector('.popup__container');

const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

let NameInput = page.querySelector('#name-input');
let JobInput = page.querySelector('#job-input');

let CardNameInput = page.querySelector('#card-name-input');
let CardLinkInput = page.querySelector('#card-link-input');

let textName = page.querySelector('.profile__info-name');
let textJob = page.querySelector('.profile__info-descript');


const elementsGridContainer = page.querySelector('.elements-grid__list');
const cardsList = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
];


function addCardToList(itemName, itemLink) {
  const elementsGridTemplate = document.getElementById('elements-grid__item-template').content;
  const elementsGridItem = elementsGridTemplate.querySelector('.elements-grid__item').cloneNode(true);
  const elementsGrid__Image = elementsGridItem.querySelector('.elements-grid__image');
  const elementsGrid__PlaceName = elementsGridItem.querySelector('.elements-grid__place-name');

  elementsGrid__Image.setAttribute('src', itemLink);
  elementsGrid__Image.setAttribute('alt', itemName);
  elementsGrid__PlaceName.textContent = itemName;

  const buttonLike = elementsGridItem.querySelector('.elements-grid__like');
  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements-grid__like_active');
  });

  const buttonDelete = elementsGridItem.querySelector('.elements-grid__delete');
  buttonDelete.addEventListener('click', function(evt) {
    elementsGridItem.remove();
  });


  const popupTemplate = document.getElementById('popup-template').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  const popup__Image = popup.querySelector('.popup__full-image');
  const popup__PlaceName = popup.querySelector('.popup__caption');

  popup__Image.setAttribute('src', itemLink);
  popup__Image.setAttribute('alt', itemName);
  popup__PlaceName.textContent = itemName;
  closePopup(popup);

  elementsGrid__Image.addEventListener('click', function() {
    popup.classList.add('popup_opened');
  });

  page.append(popup);
  elementsGridContainer.prepend(elementsGridItem);
}
function initialCards(cardsList=[]) {
  cardsList.forEach(function (item) {
    addCardToList(item.name, item.link);
  })
}

initialCards(cardsList);

function setInputValue() {
  NameInput.value = textName.textContent;
  JobInput.value = textJob.textContent;
}

function openForm(popupId) {
  popupId.classList.add('popup_opened');
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


function SubmitSaveForm(e) {
  e.preventDefault();
  textName.textContent = NameInput.value;
  textJob.textContent = JobInput.value;
  closeEventClick(popup[0]);
}

function SubmitAddCard(e) {
  e.preventDefault();
  addCardToList(CardNameInput.value, CardLinkInput.value);
  closeEventClick(popup[1]);
}

buttonSave.addEventListener('click', SubmitSaveForm);
buttonAddCard.addEventListener('click', SubmitAddCard);


function openFormClick(buttonName, formName) {
  buttonName.addEventListener( 'click', function() {
    openForm(formName);
  }, false);
}

openFormClick(buttonEdit, popupEditForm);
openFormClick(buttonAdd, popupAddForm);
