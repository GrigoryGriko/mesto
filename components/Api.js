export default class Api {
  constructor({baseUrl, keyAuth}) {
    this._baseUrl = baseUrl;
    this._keyAuth = keyAuth;
  }

  getInitCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`));
  }

  getInitUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`));
  }

  editDataUser(urlKey, {nameInput, jobInput}) {
    return fetch((this._baseUrl + urlKey), {
      method: 'PATCH',
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nameInput, about: jobInput})
    }).then(res => res.ok ? res.json() : Promise.reject(`Не удается записать ${res.status} ${res.statusText}`));
  }

  addCard(urlKey, {name, link}) {
    return fetch((this._baseUrl + urlKey), {
      method: 'POST',
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    }).then(res => res.ok ? res.json() : Promise.reject(`Не удается записать ${res.status} ${res.statusText}`));
  }

  updateAvatar(urlKey, avatar) {
    return fetch((`${this._baseUrl}${urlKey}`), {
      method: 'PATCH',
      headers: {
        authorization: this._keyAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(res => res.ok ? res.json() : Promise.reject(`Не удается записать ${res.status} ${res.statusText} - ${this._baseUrl}${urlKey}`, console.dir(avatar)));
    //Promise.reject(`Не удается записать ${res.status} ${res.statusText} - ${this._baseUrl}${urlKey}/${avatar} `));
  }   //Promise.reject(console.dir(avatar)));

  deleteCard(urlKey, cardId) {
    return fetch((this._baseUrl + urlKey + '/' + cardId), {
      method: 'DELETE',
      headers: {
        authorization: this._keyAuth
      },
      body: JSON.stringify(cardId)
    }).then(res => res.ok ? res.json() : Promise.reject(`Не удается записать ${res.status} ${res.statusText}`));
  }

  putLike(urlKey, cardId) {
    return fetch((this._baseUrl + urlKey + '/' + cardId + '/likes'), {
      method: 'PUT',
      headers: {
        authorization: this._keyAuth
      },
      body: JSON.stringify(cardId)
    }).then(res => res.ok ? res.json() : Promise.reject(`Не удается записать ${res.status} ${res.statusText}`));
  }

  deleteLike(urlKey, cardId) {
    return fetch((this._baseUrl + urlKey + '/' + cardId + '/likes'), {
      method: 'DELETE',
      headers: {
        authorization: this._keyAuth,
      },
      body: JSON.stringify(cardId)
    }).then(res => res.ok ? res.json() : Promise.reject(`Не удается записать ${res.status} ${res.statusText}`));
  }
}
