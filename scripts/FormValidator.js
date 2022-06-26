export default class FormValidator {
  constructor(validationConfig, popup) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._buttonSaveSelector = validationConfig.buttonSaveSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._buttonSaveTypeEdit = validationConfig.buttonSaveTypeEdit;
    this._buttonSaveTypeAdd = validationConfig.buttonSaveTypeAdd;

    this._popup = popup;
    this._inputList = Array.from(this._popup.querySelectorAll(this._inputSelector));
    this._buttonSaveElement = this._popup.querySelector(this._buttonSaveSelector);
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
        
  _hideInputError(inputElement) {
    const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _enableButtonSubmit() {
    this._buttonSaveElement.classList.remove(this._inactiveButtonClass);
    this._buttonSaveElement.disabled = false;
  };
    
  _disableButtonSubmit() {
    this._buttonSaveElement.classList.add(this._inactiveButtonClass);
    this._buttonSaveElement.disabled = true;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButtonSubmit();
    } else {
      this._enableButtonSubmit();
    };
  };

  _setEventListeners = (inputList, buttonSaveElement) => {   
    this._toggleButtonState(this._inputList, this._buttonSaveElement);
     
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonSaveElement);
      });
    });
  };  

  resetFormValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButtonSubmit();
  };

  enableValidation() {
    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    console.log(this._popup);
    this._setEventListeners(this._popup);
    this._toggleButtonState(this._inputList, this._buttonSaveElement);
  };
};