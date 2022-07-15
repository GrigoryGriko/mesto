export default class UserInfo {
  constructor({textNameSelector, textJobSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);

    this.getUserInfo = this.getUserInfo.bind(this);

  }

  getUserInfo() {
    return {textName: this._elementTextName.textContent, textJob: this._elementTextJob.textContent};
  }

  setUserInfo({nameInputValue, jobInputValue}) {
    this._elementTextName.textContent = nameInputValue;
    this._elementTextJob.textContent = jobInputValue;
  }
}
