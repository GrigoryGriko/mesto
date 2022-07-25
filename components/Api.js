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

  editDataUser(urlKey) {
    fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    }); 
  }

  addCard() {

  }

  deleteCard() {

  }

  putLike() {

  }

  deleteLike() {

  }
}
