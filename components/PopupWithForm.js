import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    textName.textContent = nameInput.value;
    textJob.textContent = jobInput.value;
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
