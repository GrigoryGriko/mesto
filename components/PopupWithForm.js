import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, nameInputSelector, jobInputSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._handleSubmitForm = handleSubmitForm;    //отдельной функцией в index.js. вызывает UserInfo.setUserInfo()

    this._nameInput = document.querySelector(nameInputSelector);
    this._jobInput = document.querySelector(jobInputSelector);
  }

  _getInputValues() {
    return {nameInput: this._nameInput.value, jobInput: this._jobInput.value};
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
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
