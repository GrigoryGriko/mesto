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

export const popupsList = {
  popupEditData: page.querySelector('.popup_edit_data'),
  popupAddCard: page.querySelector('.popup_add_card'),
  popupShowImage: page.querySelector('.popup_show_image')
};

export const popupContainerEditData = popupsList.popupEditData.querySelector('.popup__container');
export const popupContainerAddCard = popupsList.popupAddCard.querySelector('.popup__container');

export const popupImageLink = popupsList.popupShowImage.querySelector('.popup__full-image');
export const popupPlaceName = popupsList.popupShowImage.querySelector('.popup__caption');


export const nameInput = page.querySelector('#name-input');
export const jobInput = page.querySelector('#job-input');


export const textName = page.querySelector('.profile__info-name');
export const textJob = page.querySelector('.profile__info-descript');


export const elementsGridContainer = '.elements-grid__list';
export const selectorGridTemplate = '#elements-grid__item-template';