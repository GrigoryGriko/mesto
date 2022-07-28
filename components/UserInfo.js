export default class UserInfo {
  constructor({textNameSelector, textJobSelector, userAvatarSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);
    this._elementAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo = () => {
    return {nameInput: this._elementTextName.textContent, jobInput: this._elementTextJob.textContent};
  }

  getUserId = () => {
    return this._userId;
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    this._elementTextName.textContent = name;
    this._elementTextJob.textContent = about;


    //this._elementAvatar.setAttribute('src', avatar);
    this._elementAvatar.style.backgroundImage = `url('${avatar}')`;

    this._userId = _id;
  }

}
