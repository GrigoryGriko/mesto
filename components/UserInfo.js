export default class UserInfo {
  constructor({textNameSelector, textJobSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);

    this.getUserInfo = this.getUserInfo.bind(this);

  }

  getUserInfo() {
    return {textName: this._elementTextName.textContent, textJob: this._elementTextJob.textContent};
  }

  setUserInfo({nameInputValue, jobInputValue}) {   //?Инпуты находить прямо здесь, или передавать параметрами?
    //значения с полей принимает и заменяет их на странице
    this._elementTextName.textContent = nameInputValue;
    this._elementTextJob .textContent = jobInputValue;
  }
}
