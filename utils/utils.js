import Card from '../components/Card.js';

import {selectorGridTemplate} from './constants.js';

import {userInfo, editData, addCard, formListValidation, cardSection, popupWithImage, api, confirmDeleteCard} from '../pages/index.js';


export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}


export function handleSaveForm({nameInput, jobInput}) {
  api.editDataUser('users/me', {nameInput, jobInput})
  .then(({name, about}) => {
    userInfo.setUserInfo({name, about});
  })
  .catch((err) => {
    console.log(`Ошибка изменения данных пользователя ${err}`);
  });


  editData.close();

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  api.addCard('cards', {name, link})
    .then(({name, link}) => {
      cardSection.addItem( createCard({name, link}) );
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    });

  addCard.close();

  formListValidation['form-add-card'].lockButton();
}

export function handleDeleteCard(_id) {    //функция самого запроса на удаление. ХА-ХА, сейчас у меня будет айдишник
  api.deleteCard(`cards/${_id}`)
    .then((_id) => {
      //удаление карточки из разметки
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки ${err}`);
    });

    confirmDeleteCard.close();

  //card.deleteCard();                                  //не все, не все, нужен обработчик запроса (а чужие карточки чтобы не удалялись) в верстке убирать значки удаления, где _id не совпадает с нашим
}   //card не откда взять, он находится в другой локальной области видимости

export function createCard({name, link, likes = 0}) {
  const card = new Card({name, link, likes}, selectorGridTemplate, handleCardClick, confirmDeleteCard.open());    //вынести в глобальную область видимости

  const cardElement = card.generateCard();
  return cardElement;
}
