import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formElementSelector, submitHandler, resetValidation, getUserInfo = null) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formElement = this._popup.querySelector(formElementSelector);


    this._submitHandler = submitHandler;
    this._resetValidation = resetValidation;
    this._getUserInfo = getUserInfo;

    this.open = this.open.bind(this);
  }

  _getInputValues() {
    this._nameInput = document.querySelector('#name-input');    //поиск полей
    this._jobInput = document.querySelector('#job-input');

    return {nameInputValue: this._nameInput.value, jobInputValue: this._jobInput.value};    //нужно найти инпуты
  }

  _setInputValues() {
    document.querySelector('#name-input').value = this._getUserInfo().textName;   //нужно получать другим способо поля
    document.querySelector('#job-input').value = this._getUserInfo().textJob;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
      this._formElement.addEventListener('submit', this._handleFormSubmit);
    });
  }

  open() {
    if (this._getUserInfo !== null) {
      this._setInputValues();
    } else {
      this._formElement.reset();
    }
    this._resetValidation();
    this.setEventListeners();

    super.open();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._formElement.reset();
  }
}
