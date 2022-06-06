enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


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
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
      });
    });
  }

  const formList = Array.from(document.querySelectorAll(elementsDocument.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });

}
