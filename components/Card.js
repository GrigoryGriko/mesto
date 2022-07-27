export default class Card {
  constructor({name, link, likes, _id, ownerId}, gridTemplateSelector, handleCardClick, openPopupConfirmation, userId, handlePutLike) {
    this._name = name;
    this._link = link;
    this._likesCount = likes.length;
    this._id = _id;
    this._ownerId = ownerId;

    this._elementGridTemplate = document.querySelector(gridTemplateSelector);
    this._handleCardClick = handleCardClick;

    this._openPopupConfirmation = openPopupConfirmation;

    this._userId = userId;

    this._handlePutLike = handlePutLike;
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
    this._elementDeleteButton = this._cardElement.querySelector('.elements-grid__delete');

    this._setEventListeners();

    if (this._ownerId != this._userId) {

      this._elementDeleteButton.remove();
      this._elementDeleteButton = null;
    }

    this._cardElementImage.setAttribute('src', this._link);
    this._cardElementImage.setAttribute('alt', this._name);
    this._cardPlaceName.textContent = this._name;

    this._cardLikeCounter.textContent = this._likesCount;

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElementLike = this._cardElement.querySelector('.elements-grid__like');
    this._cardElementLike.addEventListener('click', this._handlerPutLike);

    if (this._ownerId == this._userId) {
      this._elementDeleteButton.addEventListener('click', this._handleDeleteCard);    //здесь при клике вызываем функцию посредник из index.js. В нее помещаем id карточки, состояние лайка, колбек...
    }
    this._cardElementImage.addEventListener('click', this._handleImageClick);
  }

  _handlerPutLike = () => {
    //this._cardElementLike.classList.toggle('elements-grid__like_active');
    const likeState = !this._cardElementLike.classList.contains('elements-grid__like_active') ? true : false;
    this._cardElementLike.classList.toggle('elements-grid__like_active');

    this._handlePutLike(this._id, likeState);
  }

  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleDeleteCard = () => {
    this._openPopupConfirmation(this._id, this.removeCard);
  }
  _handleImageClick = () => {
    this._handleCardClick({name: this._name, link: this._link});
  }
}
