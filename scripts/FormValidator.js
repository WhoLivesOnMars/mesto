export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._buttonSaveSelector = validationConfig.buttonSaveSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._buttonSaveTypeEdit = validationConfig.buttonSaveTypeEdit;
    this._buttonSaveTypeAdd = validationConfig.buttonSaveTypeAdd;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSaveElement = this._formElement.querySelector(this._buttonSaveSelector);
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
        
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
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

  _setEventListeners() {   
    this._toggleButtonState();
     
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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
    this._setEventListeners();
    this._toggleButtonState();
  };
};