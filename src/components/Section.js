export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(element, place) {
      if (place === 'start') {
        this._container.prepend(element);
      } else if (place === 'end') {
        this._container.append(element);
      }
    }
  
    clear() {
      this._container.innerHTML = '';
    }
  
    renderItems() {
      this.clear();
  
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }

