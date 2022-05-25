const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');

const popup = page.querySelectorAll('.popup');
const popupEditForm = page.querySelector('#edit-form');
const popupAddForm = page.querySelector('#add-form');

const popupContainer = page.querySelector('.popup__container');
const buttonClose = page.querySelectorAll('.popup__button-close');
const buttonSave = page.querySelector('.popup__button-save');

let inputName = page.querySelector('.popup__name-input');
let inputJob = page.querySelector('.popup__job-input');

let textName = page.querySelector('.profile__info-name');
let textJob = page.querySelector('.profile__info-descript');

function setInputValue() {
  inputName.value = textName.textContent;
  inputJob.value = textJob.textContent;
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
  textName.textContent = inputName.value;
  textJob.textContent = inputJob.value;
  closePopup();
}

function openFormClick(buttonName, formName) {
  buttonName.addEventListener( 'click', function() {
    openForm(formName);
  }, false);
}

openFormClick(buttonEdit, popupEditForm);
openFormClick(buttonAdd, popupAddForm);


buttonSave.addEventListener('click', SubmitSaveForm);




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

function initialCards(cardsList=[]) {
  cardsList.forEach(function (item) {
    elementsGrid.insertAdjacentHTML('afterbegin', `
    <li class="elements-grid__item">
      <img class="elements-grid__image" src="${item.link}" alt="${item.name}">

      <div class="elements-grid__text-like-wrapper">
        <h2 class="elements-grid__place-name">
          ${item.name}
        </h2>
        <button class="elements-grid__like" type="button"></button>
      </div>

    </li>
    `);
  })
}


initialCards(cardsList);
