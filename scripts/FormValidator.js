class FormValidator {
  constructor(elementsDocument, inputElement) {
    this._elementDocument = elementsDocument;
    this._inputElement = inputElement;
  }

  _showInputError(rest, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(rest.inputErrorClass);
    errorElement.textContent = errorMessage;

    if (errorElement.clientHeight >= 39) {
      errorElement.classList.add(rest.errorModifier);
    }
    errorElement.classList.add(rest.errorClass);
  }

  _hideInputError(rest, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(rest.inputErrorClass);
    errorElement.textContent = '';

    errorElement.classList.remove(rest.errorModifier);
    errorElement.classList.remove(rest.errorClass);
  }

  _checkInputValidity({validationMessage, ...rest}, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(rest, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(rest, formElement, inputElement);
    }
  }

  _setEventListeners({inputSelector, submitButtonSelector, ...rest}, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);

    this._toggleButtonState(rest, inputList, buttonSubmit);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(rest, formElement, inputElement);

        this._toggleButtonState(rest, inputList, buttonSubmit);
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

  _toggleButtonState(rest, inputList, buttonElement) {
    if ( this._isInvalidInput(inputList) ) {
      this._lockButton(buttonElement, rest.inactiveButtonClass);
    } else {
      this._unlockButton(buttonElement, rest.inactiveButtonClass);
    }
  }

  enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(rest, formElement);
    });
  }

}
