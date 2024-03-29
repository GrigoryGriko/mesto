const arkhyz = new URL('../images/arkhyz.jpg', import.meta.url);
const chelyabinskOblast = new URL('../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const kholmogorskyRayon = new URL('../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);



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
export const buttonUpdateAvatar = page.querySelector('.profile__button-avatar');

export const popupsListSelector = {
  popupEditDataSelector: '.popup_edit_data',
  popupAddCardSelector: '.popup_add_card',
  popupUpdateAvatarSelector: '.popup_update_avatar',
  popupDeleteCardSelector: '.popup_delete_card',
  popupShowImageSelector: '.popup_show_image'
};

export const formElementSelector = '.popup__container';

export const fullImageSelector = '.popup__full-image';
export const captionImageSelector = '.popup__caption';

export const textNameSelector = '.profile__info-name';
export const textJobSelector = '.profile__info-descript';

export const elementsGridContainer = '.elements-grid__list';
export const selectorGridTemplate = '#elements-grid__item-template';

export const userAvatarSelector = '.profile__button-avatar';
export const userNameSelector = '.profile__info-name';
export const userAboutSelector = '.profile__info-descript';
