class FormValidator {
  constructor(elementsDocument, inputElement) {
    this._elementDocument = elementsDocument;
    this._inputElement = inputElement;
  }

  _showInputError(formElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.add(this._elementDocument.inputErrorClass);
    errorElement.textContent = errorMessage;

    if (errorElement.clientHeight >= 39) {
      errorElement.classList.add(this._elementDocument.errorModifier);
    }
    errorElement.classList.add(this._elementDocument.errorClass);
  }

  _hideInputError(formElement) {
    const errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.remove(this._elementDocument.inputErrorClass);
    errorElement.textContent = '';

    errorElement.classList.remove(this._elementDocument.errorModifier);
    errorElement.classList.remove(this._elementDocument.errorClass);
  }

  _checkInputValidity(formElement) {
    if (!this._inputElement.validity.valid) {
      this._showInputError(formElement, this._inputElement.validationMessage);
    } else {
      this._hideInputError(formElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);

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

  _lockButton(buttonElement, innactiveButtonClass) {
    buttonElement.disabled = true;
    buttonElement.classList.add(innactiveButtonClass);
  }
  _unlockButton(buttonElement, innactiveButtonClass) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(innactiveButtonClass);
  }

  _toggleButtonState(inputList, buttonElement) {
    if ( this._isInvalidInput(inputList) ) {
      this._lockButton(buttonElement, this._elementDocument.inactiveButtonClass);
    } else {
      this._unlockButton(buttonElement, this._elementDocument.inactiveButtonClass);
    }
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._elementDocument.formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }

}
