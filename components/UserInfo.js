export default class UserInfo {
  constructor({textNameSelector, textJobSelector}, apiEditDataUser) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);
    this._apiEditDataUser = apiEditDataUser;

    this.getUserInfo = this.getUserInfo.bind(this);

  }

  getUserInfo() {
    return {nameInput: this._elementTextName.textContent, jobInput: this._elementTextJob.textContent};
  }

  setUserInfo({nameInput, jobInput}, initUserData) {
    /*this._elementTextName.textContent = nameInput;
    this._elementTextJob.textContent = jobInput;*/

    this._apiEditDataUser('users/me', {nameInput, jobInput});
    initUserData();
  }
}
