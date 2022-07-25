export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getInitial(urlKey) {
    return fetch((this._baseUrl + urlKey), {
      headers: this._headers
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`));
  }     //реализовать Promise.all

  editDataUser(urlKey, {nameInput, jobInput}) {
    return fetch((this._baseUrl + urlKey), {
      method: 'PATCH',
      headers: {
        authorization: '110d7e44-821c-45aa-84e8-91b557d72ac5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nameInput, about: jobInput})
    }).then(res => res.ok ? res.json() : Promise.reject(`Cannot add a record ${res.status} ${res.statusText}`));
  }

  addCard(urlKey, {name, link}) {
    return fetch((this._baseUrl + urlKey), {
      method: 'POST',
      headers: {
        authorization: '110d7e44-821c-45aa-84e8-91b557d72ac5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, link: link})
    }).then(res => res.ok ? res.json() : Promise.reject(`Cannot add a record ${res.status} ${res.statusText}`));
  }

  deleteCard() {

  }

  putLike() {

  }

  deleteLike() {

  }
}
