import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {

  }

  setEventListeners() {     //но и добавлять обработчик сабмита формы
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup || evt.target.classList.contains('popup__button-close')) {
        close();
      }
      this._popup.addEventListener('submit', this._handleSubmitForm);
    });
  }

  close() {   //так как при закрытии попапа форма должна ещё и сбрасываться
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); //удаление слушателя нажатия на Esc
  }
}
