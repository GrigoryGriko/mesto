const elementsDocument = {
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible',
  errorModifier: 'popup__input-error_extender_form'
};



function showInputError(elementsDocument, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(elementsDocument.inputErrorClass);
  errorElement.textContent = errorMessage;

  if (errorElement.clientHeight >= 39) {
    errorElement.classList.add(elementsDocument.errorModifier);
  }
  errorElement.classList.add(elementsDocument.errorClass);
}

function hideInputError(elementsDocument, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(elementsDocument.inputErrorClass);
  errorElement.textContent = '';

  errorElement.classList.remove(elementsDocument.errorModifier);
  errorElement.classList.remove(elementsDocument.errorClass);
}

function checkInputValidity(elementsDocument, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(elementsDocument, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(elementsDocument, formElement, inputElement);
  }
}

function setEventListeners(elementsDocument, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(elementsDocument.inputSelector));
  const buttonSubmit = formElement.querySelector(elementsDocument.submitButtonSelector);

  toggleButtonState(elementsDocument, inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(elementsDocument, formElement, inputElement);

      toggleButtonState(elementsDocument, inputList, buttonSubmit);
    });
  });
}


function isInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function lockButton(buttonElement, innactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(innactiveButtonClass);
}
function unlockButton(buttonElement, innactiveButtonClass) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(innactiveButtonClass);
}

function toggleButtonState(elementsDocument, inputList, buttonElement) {
  if ( isInvalidInput(inputList) ) {
    lockButton(buttonElement, elementsDocument.inactiveButtonClass);
  } else {
    unlockButton(buttonElement, elementsDocument.inactiveButtonClass);
  }
}

function enableValidation(elementsDocument) {
  const formList = Array.from(document.querySelectorAll(elementsDocument.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(elementsDocument, formElement);
  });
}

enableValidation(elementsDocument);
