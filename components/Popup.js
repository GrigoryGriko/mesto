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
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _handleButtonClose = (evt) => {
    if ( evt.target.classList.contains('popup__button-close') ) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    this._popup.addEventListener('mousedown', this._handleButtonClose);
  }
}
