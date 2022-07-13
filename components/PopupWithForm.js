import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, nameInputSelector, jobInputSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._nameInput = document.querySelector(nameInputSelector);
    this._jobInput = document.querySelector(jobInputSelector);

    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {   //получили значения с инпутов
    return {nameInputValue: this._nameInput.value, jobInputValue: this._jobInput.value};
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup || evt.target.classList.contains('popup__button-close')) {
        close();
      }
      this._popup.addEventListener('submit', this._handleSubmitForm);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.reset();
  }
}
