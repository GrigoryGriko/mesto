export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка ${res.status}`);
        }
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
