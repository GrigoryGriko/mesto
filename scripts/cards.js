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
  constructor(cardsList, elementsGridTemplate) {
    this._cardsList = cardsList;
    this._elementsGridTemplate = elementsGridTemplate;
  }

  _getTemplate() {
    const cardElement = elementsGridTemplate
      .querySelector('.elements-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    _setEventListeners();

    const cardElementImage = this._cardElement.querySelector('.elements-grid__image');
    const cardPlaceName = this._cardElement.querySelector('.elements-grid__place-name');

    cardElementImage.setAttribute('src', this._cardsList.link);
    cardElementImage.setAttribute('alt', this._cardsList.name);
    cardPlaceName.textContent = this._cardsList.name;

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.elements-grid__like').addEventListener('click', this._handlePutCard());
    this._cardElement.querySelector('.elements-grid__delete').addEventListener('click', this._handleDeleteCard());

    const popupImageLink = popupsList.popupShowImage.querySelector('.popup__full-image');
    const popupPlaceName = popupsList.popupShowImage.querySelector('.popup__caption');

    this._cardElement.querySelector('.elements-grid__image').addEventListener('click', function() {
      popupImageLink.setAttribute('src', this._cardsList.link);
      popupImageLink.setAttribute('alt', this._cardsList.name);
      popupPlaceName.textContent = this._cardsList.name;

      openPopup(popupsList.popupShowImage);
    });
  }

  _handlePutCard(evt) {
    evt.target.classList.toggle('elements-grid__like_active');
  }
  _handleDeleteCard(evt) {
    evt.target.closest('.elements-grid__item').remove();
  }

}
