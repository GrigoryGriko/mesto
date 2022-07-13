export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._elementUserName = document.querySelector(userNameSelector);
    this._elementUserInfo = document.querySelector(userInfoSelector)
  }

  getUserInfo() {
    return {UserName: this._elementUserName.textContent, UserInfo: this._elementUserInfo.textContent}
  }

  setUserInfo() {
    //значения с полей принимает и заменяет их на странице
    textName.textContent =
    textJob.textContent =
  }
}
