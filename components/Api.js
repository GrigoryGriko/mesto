export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getInitial(urlKey) {
    return fetch((this._baseUrl + urlKey), {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка ${res.status}`);   //реализовать Promise.all
        }
      });
  }

  editDataUser(urlKey, {nameInput, jobInput}) {
    fetch((this._baseUrl + urlKey), {
      method: 'PATCH',
      headers: {
        authorization: '110d7e44-821c-45aa-84e8-91b557d72ac5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput,
        about: jobInput
      })
    });
  }

  addCard(urlKey, {nameInput, jobInput}) {

  }

  deleteCard() {

  }

  putLike() {

  }

  deleteLike() {

  }
}
