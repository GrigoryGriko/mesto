import Popup from './Popup.js';


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formElementSelector, submitHandler) {
    super(popupSelector);

    this._popup = document.querySelector(popupSelector);

    this._formElement = this._popup.querySelector(formElementSelector);
    this._submitHandler = submitHandler;

    this._inputElement = this._formElement.querySelector('.input-general-properties');
  }

  /*_getInputValues() {   //получаем _id из невидимой формы
    return this._inputElement.value;
  }*/

_getInputValues = () => {
  return {_id: this._id, removeCard: this._removeCard};
}

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());    //сюда значит передаем в submitHandler функцию, которая делает запрос через api, без аргумента
  }   //надо понимать, это уже запрос на удаление, назад пути нет, не забыть, что он должен быть после отправки сабмита

  setEventListeners() {   //навешиваем лапшу на уши, а также слушатели закрытия, открытия
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);   //вешаем слушатель, колюбэк которого - обработчик удаления карточки
  }

  open = (_id, removeCard) => {   //_id не передается сначала сюда при создании
    //this._inputElement.value = _id;   //в скрытое поле для ввода добавляем id карточки
    this._id = _id;
    this._removeCard = removeCard;

    super.open();
  }
  //есть методы open, close - они наследуются от popup
}




