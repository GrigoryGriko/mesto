const elementsDocument = {
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible',
  errorModifier: 'popup__input-error_extender_form'
};



function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(elementsDocument.inputErrorClass);
  errorElement.textContent = errorMessage;

  if (errorElement.clientHeight >= 39) {
    errorElement.classList.add(elementsDocument.errorModifier);
  }
  errorElement.classList.add(elementsDocument.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(elementsDocument.inputErrorClass);
  errorElement.textContent = '';

  errorElement.classList.remove(elementsDocument.errorModifier);
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


function isInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function lockButton(buttonElement) {
  buttonElement.disabled = true;
}
function unlockButton(buttonElement) {
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement) {
  if ( isInvalidInput(inputList) ) {
    lockButton(buttonElement);
    buttonElement.classList.add(elementsDocument.inactiveButtonClass);
  } else {
    unlockButton(buttonElement);
    buttonElement.classList.remove(elementsDocument.inactiveButtonClass);
  }
}



function enableValidation() {
  const formList = Array.from(document.querySelectorAll(elementsDocument.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();
