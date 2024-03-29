import Popup from './Popup.js';

export default class PopupDelConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__content');
    this._button = this._popup.querySelector('.popup__save-button');
    this._buttonText = this._button.textContent;
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

  renderLoading(isLoading, loadingText = 'Удаление...') {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._buttonText;
    }
  }
}