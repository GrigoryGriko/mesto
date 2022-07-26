import Popup from './Popup.js';


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formElementSelector, submitHandler) {
    super(popupSelector);

    this._popup = document.querySelector(popupSelector);

    this._formElement = this._popup.querySelector(formElementSelector);
    this._submitHandler = submitHandler;

    this._inputElement = this._formElement.querySelector('.input-general-properties');
  }

_getInputValues = () => {
  return {_id: this._id, removeCard: this._removeCard};
}

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  }

  open = (_id, removeCard) => {
    this._id = _id;
    this._removeCard = removeCard;

    super.open();
  }
}




