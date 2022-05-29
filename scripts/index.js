const page = document.querySelector('.page');
const buttonEdit = page.querySelector('.profile__button-edit');
const buttonAdd = page.querySelector('.profile__button-add');


const popupEditData = page.querySelector('.popup_edit_data');
const popupAddCard = page.querySelector('.popup_add_card');
const popupShowImage = page.querySelector('.popup_show_image');


const buttonSave = page.querySelector('#button-save-data');
const buttonAddCard = page.querySelector('#button-add-card');

const nameInput = page.querySelector('#name-input');
const jobInput = page.querySelector('#job-input');


const textName = page.querySelector('.profile__info-name');
const textJob = page.querySelector('.profile__info-descript');


const elementsGridContainer = page.querySelector('.elements-grid__list');
const elementsGridTemplate = document.getElementById('elements-grid__item-template').content;

function createCard(cardsList) {

  const cardElement = elementsGridTemplate.querySelector('.elements-grid__item').cloneNode(true);
  const elementsGridImage = cardElement.querySelector('.elements-grid__image');
  const elementsGridPlaceName = cardElement.querySelector('.elements-grid__place-name');

  elementsGridImage.setAttribute('src', cardsList.link);
  elementsGridImage.setAttribute('alt', cardsList.name);
  elementsGridPlaceName.textContent = cardsList.name;

  const buttonLike = cardElement.querySelector('.elements-grid__like');
  buttonLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements-grid__like_active');
  });

  const buttonDelete = cardElement.querySelector('.elements-grid__delete');
  buttonDelete.addEventListener('click', function(evt) {
    cardElement.remove();
  });

  openFormClick(elementsGridImage, popupShowImage, 'elementsGridImage', cardsList);

  return cardElement;
}
function renderCard(cardsList) {
  elementsGridContainer.prepend( createCard(cardsList) );
}


function initialCards(cardsList=[]) {
  cardsList.forEach(function (item) {
    renderCard(item);
  })
}

initialCards(cardsList);

function setInputValue() {
  nameInput.value = textName.textContent;
  jobInput.value = textJob.textContent;
}

function openPopup(popupId) {
  popupId.classList.add('popup_opened');
}

function openForm(popupId) {
  openPopup(popupId);
}

function closeEventClick(popup) {
  popup.classList.remove('popup_opened');
}
function closePopup(popup) {
  const buttonClose = popup.querySelector('.popup__button-close');
  buttonClose.addEventListener('click', function() {
    closeEventClick(popup);
  });
}


closePopup(popupEditData);
closePopup(popupAddCard);
closePopup(popupShowImage);


function handleSaveForm(e) {
  e.preventDefault();
  textName.textContent = nameInput.value;
  textJob.textContent = jobInput.value;
  closeEventClick(popupEditData);
}

function handleAddCardButton(e) {
  e.preventDefault();

  const cardInput = {
    name: page.querySelector('#card-name-input').value,
    link: page.querySelector('#card-link-input').value
  };
  
  renderCard(cardInput);
  closeEventClick(popupAddCard);

  popupAddCard.querySelector('.popup__container').reset();
}

popupEditData.addEventListener('submit', handleSaveForm);
buttonAddCard.addEventListener('click', handleAddCardButton);


function openFormClick(buttonName, formName, setInput=false, cardsList=false) {
  buttonName.addEventListener( 'click', function() {
    if (setInput === 'buttonEdit') {
      setInputValue();
    }
    else if (setInput === 'elementsGridImage') {
      const popupImageLink = popupShowImage.querySelector('.popup__full-image');
      const popupPlaceName = popupShowImage.querySelector('.popup__caption');

      popupImageLink.setAttribute('src', cardsList.link);
      popupImageLink.setAttribute('alt', cardsList.name);
      popupPlaceName.textContent = cardsList.name;
    }
    openForm(formName);
  }, false);
}

openFormClick(buttonEdit, popupEditData, 'buttonEdit');
openFormClick(buttonAdd, popupAddCard);
