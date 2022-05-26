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


  const cardImage = popup.querySelector('.popup__full-image');
  console.log(cardImage);
  cardImage.addEventListener('click', function() {  /*не ловится событие клика*/
    console.log(111);
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
