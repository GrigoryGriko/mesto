export default class UserInfo {
  constructor({textNameSelector, textJobSelector, userAvatarSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);
    this._elementAvatar = document.querySelector(userAvatarSelector);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);   //что-то делать с привязкой контекста
  }

  getUserInfo() {
    return {nameInput: this._elementTextName.textContent, jobInput: this._elementTextJob.textContent, Userid: this._userId};
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    console.log('iii');
    console.dir(this);
    this._elementTextName.textContent = name;
    this._elementTextJob.textContent = about;


    this._elementAvatar.setAttribute('src', avatar);
    this._elementAvatar.setAttribute('alt', 'аватарка');

    this._userId = _id;
    console.log('asd' + _id);
  }

}
