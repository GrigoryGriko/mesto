import Card from '../components/Card.js';

import {selectorGridTemplate} from './constants.js';

import {userInfo, editData, addCard, updateAvatar, formListValidation, cardSection, popupWithImage, api, confirmDeleteCard} from '../pages/index.js';



export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}

export function handleSaveForm({nameInput, jobInput}) {
  api.editDataUser('users/me', {nameInput, jobInput})
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Ошибка изменения данных пользователя ${err}`);
  });

  editData.close();

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  api.addCard('cards', {name, link})
    .then((cardData) => {
      cardSection.addItem( createCard(cardData) );
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    });

  addCard.close();

  formListValidation['form-add-card'].lockButton();
}

export function handleUpdateAvatar({linkAvatarInput: avatar}) {
  api.updateAvatar('users/me/avatar', avatar)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(`Ошибка изменения аватара ${err}`);
    });

  updateAvatar.close();

  formListValidation['form-add-card'].lockButton();
}

export function handleDeleteCard({_id, removeCard}) {
  api.deleteCard('cards', _id)
    .then((_id) => {
      removeCard();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки ${err}`);
    });

    confirmDeleteCard.close();
}

export function handlePutLike(_id, likeState, updateLikes) {
  if (likeState) {
    api.putLike('cards', _id)
    .then(({likes: likes}) => {
      updateLikes(likes);
    })
    .catch((err) => {
      console.log(`Ошибка постановки лайка ${err}`);
    });

  } else {
    api.deleteLike('cards', _id)
    .then(({likes: likes}) => {
      updateLikes(likes);
    })
    .catch((err) => {
      console.log(`Ошибка постановки лайка ${err}`);
    });
  }
}

export function createCard({name, link, likes, _id, owner: {_id: ownerId}}) {
  const userId = userInfo.getUserId();
  const card = new Card({name, link, likes, _id, ownerId}, selectorGridTemplate, handleCardClick, confirmDeleteCard.open, userId, handlePutLike);

  const cardElement = card.generateCard();
  return cardElement;
}
