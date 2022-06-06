enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function enableValidation(elementsDocument) {
  const form = document.querySelector(elementsDocument.formSelector);
  const formInput = form.querySelector(elementsDocument.inputSelector);
  const formError = form.querySelector(`.${formInput.id}-error`);

  function showInputError(inputElement, errorMessage) {
    inputElement.classList.add(elementsDocument.inputErrorClass);


  }
}
