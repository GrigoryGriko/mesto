export default class Card {
  constructor({name, link, likes, _id}, gridTemplateSelector, handleCardClick, openPopupConfirmation) {
    this._name = name;
    this._link = link;
    this._likesCount = likes.length;
    this._id = _id;

    this._elementGridTemplate = document.querySelector(gridTemplateSelector);
    this._handleCardClick = handleCardClick;

    this._openPopupConfirmation = openPopupConfirmation;
  }
  _getTemplate() {
    return this._elementGridTemplate
    .content
    .querySelector('.elements-grid__item')
    .cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardElementImage = this._cardElement.querySelector('.elements-grid__image');
    this._cardPlaceName = this._cardElement.querySelector('.elements-grid__place-name');
    this._cardLikeCounter = this._cardElement.querySelector('.elements-grid__like-counter');

    this._setEventListeners();

    this._cardElementImage.setAttribute('src', this._link);
    this._cardElementImage.setAttribute('alt', this._name);
    this._cardPlaceName.textContent = this._name;

    this._cardLikeCounter.textContent = this._likesCount; //чекпоинт

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElementLike = this._cardElement.querySelector('.elements-grid__like');
    this._cardElementLike.addEventListener('click', this._handlePutLike);
    this._cardElement.querySelector('.elements-grid__delete').addEventListener('click', this._handleDeleteCard);

    this._cardElementImage.addEventListener('click', this._handleImageClick);
  }

  _handlePutLike = () => {
    this._cardElementLike.classList.toggle('elements-grid__like_active');
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleDeleteCard = () => {   //удаление карточки-1 не удалять карточку сразу, а открывать popup с подтверждением
    this._openPopupConfirmation(this._id);

    /*this._cardElement.remove();   //1 открывать форму подтверждения. сделать слабое связывание с методом. Это удаление локальное, поэтому его надо делать...
    this._cardElement = null;*/   //короче это содержимое вынести в отдельный метод этого класса и вызывать при api запросе
  }
  _handleImageClick = () => {
    this._handleCardClick({name: this._name, link: this._link});
  }
}
