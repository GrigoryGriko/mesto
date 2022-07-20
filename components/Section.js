export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderer();
  }

  addItem(...element) {
    this._container.prepend(...element);
  }
}
