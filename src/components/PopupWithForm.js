import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlerSubmitForm }) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._formSelector = document.querySelector(popupSelector);
    this._inputList = this._formSelector.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log(this._getInputValues());
        this._handlerSubmitForm(this._getInputValues());
        // this.close();
    });
  };
  close() {
    // this._formSelector.reset();
    super.close();
  }
}