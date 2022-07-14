export default class UserInfo {
  constructor({textNameSelector, textJobSelector}) {
    this._elementTextName = document.querySelector(textNameSelector);
    this._elementTextJob = document.querySelector(textJobSelector);

    this.getUserInfo = this.getUserInfo.bind(this);

  }

  getUserInfo() {
    console.log('UserInfo.getUserInfo().\nthis:');
    console.dir(this);
    return {textName: this._elementTextName.textContent, textJob: this._elementTextJob.textContent};
  }

  setUserInfo({nameInputValue, jobInputValue}) {   //?Инпуты находить прямо здесь, или передавать параметрами?
    //значения с полей принимает и заменяет их на странице
    textName.textContent = nameInputValue;
    textJob.textContent = jobInputValue;
  }
}
