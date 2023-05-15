import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlerSubmitForm }) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._formElement = this._popup.querySelector('.popup__content');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  };

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    })
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handlerSubmitForm(this._getInputValues());
        //this.close();
    });
  };
  close() {
    this._formElement.reset();
    super.close();
  }
}