import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector, fullImage, captionImage, imageName, imageLink) {   //в fullImage, captionImage передавать селекторы
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);

    this._fullImage = fullImage;
    this._captionImage = captionImage;
    this._imageName = imageName;
    this._imageLink = imageLink;
  }

  open() {
    this._fullImage.setAttribute('src', this._imageLink);
    this._captionImage.setAttribute('alt', this._imageName);
    this._captionImage.textContent = this._imageName;

    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
}
