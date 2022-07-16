import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector, fullImageSelector, captionImageSelector, imageName, imageLink) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._fullImage = this._popup.querySelector(fullImageSelector);
    this._captionImage = this._popup.querySelector(captionImageSelector);
    this._imageName = imageName;
    this._imageLink = imageLink;
  }

  open() {
    this._fullImage.setAttribute('src', this._imageLink);
    this._captionImage.setAttribute('alt', this._imageName);
    this._captionImage.textContent = this._imageName;

    this._popup.classList.add('popup_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
  }
}
