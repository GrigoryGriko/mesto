import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._submitHandler = submitHandler;    //отдельной функцией в index.js. вызывает UserInfo.setUserInfo()
  }

  _getInputValues() {
    return {nameInput: this._nameInput.value, jobInput: this._jobInput.value};
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
      this._popup.addEventListener('submit', this._handleSubmitForm);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.reset();
  }
}
