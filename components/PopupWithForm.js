import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, resetValidation, getUserInfo = null) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._submitHandler = submitHandler;    //отдельной функцией в index.js. вызывает UserInfo.setUserInfo()
    this._resetValidation = resetValidation;
    this._getUserInfo = getUserInfo;
  }

  _getInputValues() {
    this._nameInput = document.querySelector('#name-input');    //поиск полей
    this._jobInput = document.querySelector('#job-input');

    return {nameInput: this._nameInput.value, jobInput: this._jobInput.value};    //нужно найти инпуты
  }

  _setInputValues() {
    this._getInputValues().nameInput = this._getUserInfo().userName;
    this._getInputValues().jobInput = this._getUserInfo().userInfo;
    /*this._nameInput.value = textName.textContent;
    this._jobInput.value = textJob.textContent;*/   //нужно найти инпуты
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    //собираем данные из инпутов
    this._submitHandler(this._getInputValues());  //передаем объект со значениями из полей
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup || evt.target.classList.contains('popup__button-close')) {
        close();
      }
      this._popup.addEventListener('submit', this._handleFormSubmit);
    });
  }

  open() {
    if (this._getUserInfo !== null) {
      this._setInputValue();
    } else {
      this._popup.reset();
      //вызвать метод сброса ошибок
      super.popup();
    }


  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.reset();
  }
}
