export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems = (cardsList) => {
    this._renderer(cardsList);
  }

  addItem(...element) {
    this._container.prepend(...element);
  }
}
