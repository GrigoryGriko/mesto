class FormValidator {
  constructor({
    formSelector, inputSelector, submitButtonSelector, inactiveButtonClass,
    inputErrorClass, errorClass, errorModifier
  }, formElement) {

    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._errorModifier = errorModifier;

    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;

    if (errorElement.clientHeight >= 39) {
      errorElement.classList.add(this._errorModifier);
    }
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';

    errorElement.classList.remove(this._errorModifier);
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }


  _isInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _unlockButton() {
    this._buttonSubmit.disabled = false;
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState() {
    if ( this._isInvalidInput() ) {
      this.lockButton();
    } else {
      this._unlockButton(this._buttonSubmit);
    }
  }


  lockButton() {
    this._buttonSubmit.disabled = true;
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  }

  resetValidation = () => {
    this.lockButton();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}


export {FormValidator};
