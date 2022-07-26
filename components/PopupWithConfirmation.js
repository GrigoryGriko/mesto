import Popup from './Popup.js';


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formElementSelector, submitHandler) {
    super(popupSelector);

    this._popup = document.querySelector(popupSelector);

    this._formElement = this._popup.querySelector(formElementSelector);
    this._submitHandler = submitHandler;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler();    //сюда значит передаем в submitHandler функцию, которая делает запрос через api, без аргумента
  }   //надо понимать, это уже запрос на удаление, назад пути нет, не забыть, что он должен быть после отправки сабмита

  setEventListeners() {   //навешиваем лапшу на уши, а также слушатели закрытия, открытия
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);   //вешаем слушатель, колюбэк которого - обработчик удаления карточки
  }

  //есть методы open, close - они наследуются от popup
}




