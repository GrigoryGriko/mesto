const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
let popup = page.querySelector('.popup');
let popupContainer = page.querySelector('.popup__container');
let buttonClose = popup.querySelector('.popup__button-close');
let buttonSave = popup.querySelector('.popup__button-save');

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
setInputValue();

buttonClose.addEventListener('click', formClose);
buttonSave.addEventListener('click', formSubmitSave);


