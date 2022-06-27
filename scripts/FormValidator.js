class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorModifier}, formElement, lockButton, hideInputError) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._errorModifier = errorModifier;

    this._formElement = formElement;

    this._lockButton = lockButton;
    this._hideInputError = hideInputError;
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

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError({inputErrorClass: this._inputErrorClass, errorClass: this._errorClass, errorModifier: this._errorModifier}, this._formElement, inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonSubmit);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList, buttonSubmit);
      });
    });
  }


  _isInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _unlockButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState(inputList, buttonElement) {
    if ( this._isInvalidInput(inputList) ) {
      this._lockButton(buttonElement, this._inactiveButtonClass);
    } else {
      this._unlockButton(buttonElement);
    }
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }
}


export {FormValidator};
/**/
