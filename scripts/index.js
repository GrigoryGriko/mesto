const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');

const popup = page.querySelectorAll('.popup');
const popupEditForm = page.querySelector('#edit-form');
const popupAddForm = page.querySelector('#add-form');

const popupContainer = page.querySelector('.popup__container');
const buttonClose = page.querySelectorAll('.popup__button-close');
const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

let NameInput = page.querySelector('#name-input');
let JobInput = page.querySelector('#job-input');

let CardNameInput = page.querySelector('#card-name-input');
let CardLinkInput = page.querySelector('#card-link-input');

let textName = page.querySelector('.profile__info-name');
let textJob = page.querySelector('.profile__info-descript');


const elementsGrid = page.querySelector('.elements-grid__list');
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
  elementsGrid.insertAdjacentHTML('afterbegin', `
  <li class="elements-grid__item">
    <img class="elements-grid__image" src="${itemLink}" alt="${itemName}">

    <div class="elements-grid__text-like-wrapper">
      <h2 class="elements-grid__place-name">
        ${itemName}
      </h2>
      <button class="elements-grid__like" type="button"></button>
    </div>

  </li>
  `);
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

function closePopup() {
  Array.from(popup).forEach((item) => {
    item.classList.remove('popup_opened');
  });
}
function closeFormClick() {
  Array.from(buttonClose).forEach((item) => {
    item.addEventListener( 'click', function() {
      closePopup();
    }, false);
  });
}

closeFormClick();


function SubmitSaveForm(e) {
  e.preventDefault();
  textName.textContent = NameInput.value;
  textJob.textContent = JobInput.value;
  closePopup();
}

function SubmitAddCard(e) {
  e.preventDefault();
  addCardToList(CardNameInput.value, CardLinkInput.value);
  closePopup();
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
