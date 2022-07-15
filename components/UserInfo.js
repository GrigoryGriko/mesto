export default class UserInfo {
  constructor({textNameSelector, textJobSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);

    this.getUserInfo = this.getUserInfo.bind(this);

  }

  getUserInfo() {
    return {nameInput: this._elementTextName.textContent, jobInput: this._elementTextJob.textContent};
  }

  setUserInfo({nameInput, jobInput}) {
    this._elementTextName.textContent = nameInput;
    this._elementTextJob.textContent = jobInput;
  }
}
