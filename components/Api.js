export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getInitialCards() {
    console.log(this._baseUrl);
    return fetch(this._baseUrl, {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  putAddCard() {

  }

  deleteCard() {

  }

  putLike() {

  }

  deleteLike() {

  }
}
