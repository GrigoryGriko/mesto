import Card from '../components/Card.js';

import {selectorGridTemplate} from './constants.js';

import {userInfo, editData, addCard, updateAvatar, formListValidation, cardSection, popupWithImage, api, confirmDeleteCard} from '../pages/index.js';



export function handleCardClick({name, link}) {
  popupWithImage.open(name, link);
}

export function handleSaveForm({nameInput, jobInput}) {
  editData.renderLoading(true);

  api.editDataUser({nameInput, jobInput})
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Ошибка изменения данных пользователя ${err}`);
  })
  .finally(() => {
    editData.close();
    editData.renderLoading(false);
  });

  formListValidation['form-edit-info'].lockButton();
}

export function handleAddCardButton({nameInputCard: name, linkInput: link}) {
  addCard.renderLoading(true);

  api.addCard({name, link})
    .then((cardData) => {
      cardSection.addItem( createCard(cardData) );
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    })
    .finally(() => {
      addCard.close();
      addCard.renderLoading(false);
    });

  formListValidation['form-add-card'].lockButton();
}

export function handleUpdateAvatar({linkAvatarInput: avatar}) {
  updateAvatar.renderLoading(true);

  api.updateAvatar({avatar: avatar})
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(`Ошибка изменения аватара ${err}`);
    })
    .finally(() => {
      updateAvatar.close();
      updateAvatar.renderLoading(false);
    });

  formListValidation['form-update-avatar'].lockButton();
}

export function handleDeleteCard({_id, removeCard}) {
  confirmDeleteCard.renderLoading(true);

  api.deleteCard(_id)
    .then((_id) => {
      removeCard();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки ${err}`);
    })
    .finally(() => {
      confirmDeleteCard.close();
      confirmDeleteCard.renderLoading(false);
    });

    formListValidation['form-delete-card'].lockButton();
}

export function handlePutLike(_id, likeState, updateLikes) {
  if (likeState) {
    api.putLike(_id)
    .then(({likes: likes}) => {
      updateLikes(likes);
    })
    .catch((err) => {
      console.log(`Ошибка постановки лайка ${err}`);
    });

  } else {
    api.deleteLike(_id)
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
