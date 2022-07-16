export const cardsList = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
];

export const elementsDocument = {
  formSelector: '.popup__container',
  inputSelector: '.input-general-properties',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__error_visible',
  errorModifier: 'popup__input-error_extender_form'
};

export const page = document.querySelector('.page');
export const buttonEdit = page.querySelector('.profile__button-edit');
export const buttonAdd = page.querySelector('.profile__button-add');

export const popupsListSelector = {
  popupEditDataSelector: '.popup_edit_data',
  popupAddCardSelector: '.popup_add_card',
  popupShowImageSelector: '.popup_show_image'
};

export const formElementSelector = '.popup__container';

export const fullImageSelector = '.popup__full-image';
export const captionImageSelector = '.popup__caption';

export const textNameSelector = '.profile__info-name';
export const textJobSelector = '.profile__info-descript';

export const elementsGridContainer = '.elements-grid__list';
export const selectorGridTemplate = '#elements-grid__item-template';
