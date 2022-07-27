export default class UserInfo {
  constructor({textNameSelector, textJobSelector, userAvatarSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);
    this._elementAvatar = document.querySelector(userAvatarSelector);

    this.getUserInfo = this.getUserInfo.bind(this);

  }

  getUserInfo() {
    return {nameInput: this._elementTextName.textContent, jobInput: this._elementTextJob.textContent};
  }

  setUserInfo({name, about, avatar}) {
    this._elementTextName.textContent = name;
    this._elementTextJob.textContent = about;


    this._elementAvatar.setAttribute('src', avatar);
    this._elementAvatar.setAttribute('alt', 'аватарка');
  }

}
