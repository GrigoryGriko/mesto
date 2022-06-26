const cardsList = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
];

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
    this._setEventListeners();

    const cardElementImage = this._cardElement.querySelector('.elements-grid__image');
    const cardPlaceName = this._cardElement.querySelector('.elements-grid__place-name');

    cardElementImage.setAttribute('src', this._link);
    cardElementImage.setAttribute('alt', this._name);
    cardPlaceName.textContent = this._name;

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.elements-grid__like').addEventListener('click', this._handlePutLike);
    this._cardElement.querySelector('.elements-grid__delete').addEventListener('click', this._handleDeleteCard);

    this._cardElement.querySelector('.elements-grid__image').addEventListener('click', this._handleImageClick);
  }

  _handlePutLike = () => {
    this._cardElement.querySelector('.elements-grid__like').classList.toggle('elements-grid__like_active');
  }
  _handleDeleteCard = () => {
    this._cardElement.querySelector('.elements-grid__delete').closest('.elements-grid__item').remove();
  }
  _handleImageClick = () => {
    this._handleOpenViewPopup({name: this._name, link: this._link});
  }
}


export {cardsList, Card};
