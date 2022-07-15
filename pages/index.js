import {Card} from '../components/Cards.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  cardsList, elementsDocument, page, buttonEdit, buttonAdd, popupsListSelector, formElementSelector, popupContainerEditData,
  popupContainerAddCard, fullImage, captionImage, nameInput, jobInput, nameInputSelector, jobInputSelector, textName,
  textJob, textNameSelector, textJobSelector, elementsGridContainer, selectorGridTemplate
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardList = new Section({
  items: cardsList,
  renderer: (item) => {
    const card = new Card(item, selectorGridTemplate, handleCardClick);
    const elementCard = card.generateCard();

    cardList.addItem(elementCard);
  }
}, elementsGridContainer);

cardList.renderItems();


function handleCardClick({name, link}) {
  const popupWithImage = new PopupWithImage(popupsListSelector.popupShowImageSelector, fullImage, captionImage, name, link);
  popupWithImage.open();
}

function handleAddCardButton(e) {
  e.preventDefault();

  const cardInput = {
    name: page.querySelector('#card-name-input').value,
    link: page.querySelector('#card-link-input').value
  };

  renderCard(cardInput);
  closePopup(popupsListSelector.popupAddCard);

  popupContainerAddCard.reset();
  validatorAddCard.lockButton();
}


const formListValidation = {};
Array.from(page.querySelectorAll(formElementSelector)).forEach((item) => {
  formListValidation[item.name] = new FormValidator(elementsDocument, item);
  formListValidation[item.name].enableValidation();
});


popupContainerAddCard.addEventListener('submit', handleAddCardButton);

const validatorAddCard = new FormValidator(elementsDocument, popupContainerAddCard);
validatorAddCard.enableValidation();


function handleSaveForm({nameInput, jobInput}) {
  userInfo.setUserInfo({nameInput, jobInput});

  editData.close();

  formListValidation['form-edit-info'].lockButton();    //['form-edit-info'] - это ужасно, что-то надо придумать, константу создать или циклом вызывать
}

const userInfo = new UserInfo({textNameSelector, textJobSelector});

const editData = new PopupWithForm(
  popupsListSelector.popupEditDataSelector, formElementSelector,
  handleSaveForm, formListValidation['form-edit-info'].resetValidation, userInfo.getUserInfo
);
editData.setEventListeners();

const addCard = new PopupWithForm(
  popupsListSelector.popupAddCardSelector, formElementSelector,
  handleAddCardButton, formListValidation['form-add-card'].resetValidation
);
addCard.setEventListeners();


buttonEdit.addEventListener( 'click', function() {
  editData.open();
}, false);

buttonAdd.addEventListener( 'click', function() {
  addCard.open();
}, false);
