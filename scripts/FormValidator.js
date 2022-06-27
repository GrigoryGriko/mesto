class FormValidator {
  constructor({
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
      errorModifier}, inputElement, lockButton, hideInputError) {

    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._errorModifier = errorModifier;

    this._inputElement = inputElement;

    this._lockButton = lockButton;
    this._hideInputError = hideInputError;
  }

  _showInputError(formElement) {
    const errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.add(this._inputErrorClass);
    console.log(this._inputElement);
    errorElement.textContent = this._inputElement.validationMessage;

    if (errorElement.clientHeight >= 39) {
      errorElement.classList.add(this._errorModifier);
    }
    errorElement.classList.add(this._errorClass);
  }

  _checkInputValidity(formElement) {
    if (!this._inputElement.validity.valid) {
      this._showInputError(formElement);
    } else {
      this._hideInputError({inputErrorClass: this._inputErrorClass, errorClass: this._errorClass, errorModifier: this._errorModifier}, formElement, this._inputElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonSubmit = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonSubmit);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement);

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
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}


export {FormValidator};
