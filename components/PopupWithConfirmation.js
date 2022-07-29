import Popup from './Popup.js';


export default class PopupWithConfirmation extends Popup {
  constructor(
    popupSelector, formElementSelector, submitHandler,
      {
        buttonSubmitSelector,
        textButtonDefault,
        textButtonLoader
      }
    ) {
    super(popupSelector);

    this._popup = document.querySelector(popupSelector);

    this._formElement = this._popup.querySelector(formElementSelector);
    this._submitHandler = submitHandler;

    this._buttonSubmitElement = this._popup.querySelector(buttonSubmitSelector);
    this._configButtonText = {textButtonDefault, textButtonLoader};

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

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmitElement.textContent = this._configButtonText.textButtonLoader;
    } else {
      this._buttonSubmitElement.textContent = this._configButtonText.textButtonDefault;
    }
  }

  open = (_id, removeCard) => {
    this._id = _id;
    this._removeCard = removeCard;

    super.open();
  }
}




