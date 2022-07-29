import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector, fullImageSelector, captionImageSelector) {
    super(popupSelector);

    this._fullImage = this._popup.querySelector(fullImageSelector);
    this._captionImage = this._popup.querySelector(captionImageSelector);
  }

  open(imageName, imageLink) {
    this._fullImage.setAttribute('src', imageLink);
    this._captionImage.setAttribute('alt', imageName);
    this._captionImage.textContent = imageName;

    super.open();
  }
}
