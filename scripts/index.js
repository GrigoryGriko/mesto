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
/**/
