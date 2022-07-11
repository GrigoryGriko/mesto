export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); //удаление слушателя нажатия на Esc
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      //const popupOpened = page.querySelector('.popup_opened');    //открытый popup
      this.close();   //нужно закрыть открытый popup
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup || evt.target.classList.contains('popup__button-close')) {
        close();
      };
    });
  }
}
