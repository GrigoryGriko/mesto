import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    //В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
    /*
    popupImageLink.setAttribute('src', link);
    popupImageLink.setAttribute('alt', name);
    popupPlaceName.textContent = name;
    */
   /* this._popup.setAttribute('src', link);
    this._popup.setAttribute('alt', name);
    popupPlaceName.textContent = name;*/

    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);

  }
}
