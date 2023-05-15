import Popup from './Popup.js';

export default class PopupDelConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__content');
  }

  setCallback(submitDelButton) {
    this._handleSubmit = submitDelButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}