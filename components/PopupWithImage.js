import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector, fullImage, imageCaption, imageName, imageLink) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._fullImage = fullImage;
    this._imageCaption = imageCaption;
    this._imageName = imageName;
    this._imageLink = imageLink;
  }

  open() {
    this._image.setAttribute('src', this._imageLink);
    this._image.setAttribute('alt', this._imageName);
    this._caption.textContent = this._imageName;

    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
}
