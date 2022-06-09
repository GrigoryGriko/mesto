function showInputError(rest, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(rest.inputErrorClass);
  errorElement.textContent = errorMessage;

  if (errorElement.clientHeight >= 39) {
    errorElement.classList.add(rest.errorModifier);
  }
  errorElement.classList.add(rest.errorClass);
}

function hideInputError(rest, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(rest.inputErrorClass);
  errorElement.textContent = '';

  errorElement.classList.remove(rest.errorModifier);
  errorElement.classList.remove(rest.errorClass);
}

function checkInputValidity(rest, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(rest, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(rest, formElement, inputElement);
  }
}

function setEventListeners({inputSelector, submitButtonSelector, ...rest}, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);

  toggleButtonState(rest, inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(rest, formElement, inputElement);

      toggleButtonState(rest, inputList, buttonSubmit);
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

function toggleButtonState(rest, inputList, buttonElement) {
  if ( isInvalidInput(inputList) ) {
    lockButton(buttonElement, rest.inactiveButtonClass);
  } else {
    unlockButton(buttonElement, rest.inactiveButtonClass);
  }
}

function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(rest, formElement);
  });
}
