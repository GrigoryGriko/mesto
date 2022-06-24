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

  createCard() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector('.elements-grid__image').setAttribute('src', this._cardsList.link);
    this._cardElement.querySelector('.elements-grid__image').setAttribute('alt', this._cardsList.name);
    this._cardElement.querySelector('.elements-grid__place-name').textContent = this._cardsList.name;



    const buttonLike = this._cardElement.querySelector('.elements-grid__like');
    buttonLike.addEventListener('click', putLike);  /*2*/

    const buttonDelete = this._cardElement.querySelector('.elements-grid__delete');
    buttonDelete.addEventListener('click', deleteCard); /*2*/

    const popupImageLink = popupsList.popupShowImage.querySelector('.popup__full-image');   /*переменная popupsList в index.js*/
    const popupPlaceName = popupsList.popupShowImage.querySelector('.popup__caption');

    cardElementImage.addEventListener('click', function() { /*2*/
      popupImageLink.setAttribute('src', this._cardsList.link);
      popupImageLink.setAttribute('alt', this._cardsList.name);
      popupPlaceName.textContent = this._cardsList.name;

      openPopup(popupsList.popupShowImage);
    });

    return this._cardElement;
  }

}


