export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._elementUserName = document.querySelector(userNameSelector);
    this._elementUserInfo = document.querySelector(userInfoSelector)
  }

  getUserInfo() {
    return {UserName: this._elementUserName.textContent, UserInfo: this._elementUserInfo.textContent};
  }

  setUserInfo() {   //?Инпуты находить прямо здесь, или передавать параметрами?
    //значения с полей принимает и заменяет их на странице
    textName.textContent = document.querySelector('#name-input');
    textJob.textContent = document.querySelector('#job-input');
  }
}