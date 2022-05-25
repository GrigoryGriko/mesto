const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const popup = page.querySelector('.popup');
const popupContainer = page.querySelector('.popup__container');
const buttonClose = popup.querySelector('.popup__button-close');
const buttonSave = popup.querySelector('.popup__button-save');

let inputName = popup.querySelector('.popup__name-input');
let inputJob = popup.querySelector('.popup__job-input');

let textName = page.querySelector('.profile__info-name');
let textJob = page.querySelector('.profile__info-descript');

function setInputValue() {
  inputName.value = textName.textContent;
  inputJob.value = textJob.textContent;
}

function formEdit() {
  popup.classList.add('popup_opened');
  setInputValue();
}
function formClose() {
  popup.classList.remove('popup_opened');
}
function formSubmitSave(e) {
  e.preventDefault();
  textName.textContent = inputName.value;
  textJob.textContent = inputJob.value;
  formClose();
}


buttonEdit.addEventListener('click', formEdit);
buttonClose.addEventListener('click', formClose);
buttonSave.addEventListener('click', formSubmitSave);




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
