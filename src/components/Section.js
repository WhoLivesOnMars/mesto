export default class Section {
    constructor({ renderer }, containerSelector) {
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
  
    renderItems(items) {
      this.clear();
  
      items.forEach(item => {
        this._renderer(item);
      });
    }
    /*
    renderItems(items) {
      items.forEach(item => this._container.append(this._renderer(item)))
    }

    addItem(item) {
      this._container.prepend(this._renderer(item));
    }*/
  }