class Card {
  constructor({name, link}, elementsGridTemplate, handleOpenViewPopup) {
    this._name = name;
    this._link = link;

    this._elementsGridTemplate = elementsGridTemplate;
    this._handleOpenViewPopup = handleOpenViewPopup;
  }
  _getTemplate() {
    const cardElement = this._elementsGridTemplate
      .querySelector('.elements-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardElementImage = this._cardElement.querySelector('.elements-grid__image');
    const cardPlaceName = this._cardElement.querySelector('.elements-grid__place-name');

    this._setEventListeners();

    this._cardElementImage.setAttribute('src', this._link);
    this._cardElementImage.setAttribute('alt', this._name);
    cardPlaceName.textContent = this._name;

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
  _handleDeleteCard = () => {
    this._cardElement.remove();
  }
  _handleImageClick = () => {
    this._handleOpenViewPopup({name: this._name, link: this._link});
  }
}


export {Card};
