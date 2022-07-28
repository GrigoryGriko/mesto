import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(
      popupSelector, formElementSelector, submitHandler,
      resetValidation,
      {
        buttonSubmitSelector,
        textButtonDefault,
        textButtonLoader
      },
      getUserInfo = null
    ) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formElement = this._popup.querySelector(formElementSelector);

    this._submitHandler = submitHandler;
    this._resetValidation = resetValidation;

    this._buttonSubmitElement = this._popup.querySelector(buttonSubmitSelector);
    this._configButtonText = {textButtonDefault, textButtonLoader};

    this._getUserInfo = getUserInfo;

    this._inputElements = this._formElement.querySelectorAll('.input-general-properties');

    this.open = this.open.bind(this);
  }

  _getInputValues() {
    this._formValues = {}
    Array.from(this._inputElements).forEach((item) => {
      this._formValues[item.id] = item.value;
    });
    return this._formValues;
  }

  _setInputValues(data) {
    this._inputElements.forEach((item) => {
      item.value = data[item.id];
    });
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
    super.renderLoading(isLoading);
  }

  open() {
    if (this._getUserInfo !== null) {
      this._setInputValues(this._getUserInfo());
    } else {
      this._formElement.reset();
    }
    this._resetValidation();

    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
