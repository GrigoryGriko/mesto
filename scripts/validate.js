function enableValidation(elementsDocument) {
  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(elementsDocument.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(elementsDocument.errorClass);
  }

  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(elementsDocument.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(elementsDocument.errorClass);
  }

  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(elementsDocument.inputSelector));
    const buttonSubmit = formElement.querySelector(elementsDocument.submitButtonSelector);

    toggleButtonState(inputList, buttonSubmit);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);

        toggleButtonState(inputList, buttonSubmit);
      });
    });
  }

  const formList = Array.from(document.querySelectorAll(elementsDocument.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });


  function isInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  function toggleButtonState(inputList, buttonElement) {
    if ( isInvalidInput(inputList) ) {
      buttonElement.disabled = true;
      buttonElement.classList.add(elementsDocument.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(elementsDocument.inactiveButtonClass);
    }
  }

}

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible'
});

/*даже если кнопка закрыта, форму отправить можно нажатием Enter. Исправить*/
