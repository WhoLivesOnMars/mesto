/*------ Валидация формы ------*/

const validationConfig = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  buttonSaveSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
  
const showInputError = (popup, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = popup.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
      
const hideInputError = (popup, inputElement, validationConfig) => {
  const errorElement = popup.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const enableButtonSubmit = (buttonSaveElement, validationConfig) => {
  buttonSaveElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonSaveElement.disabled = false;
};

const disableButtonSubmit = (buttonSaveElement, validationConfig) => {
  buttonSaveElement.classList.add(validationConfig.inactiveButtonClass);
  buttonSaveElement.disabled = true;
};

const resetFormValidation = (popup, buttonSaveElement, {inputSelector, ...rest}) => {
  const inputList = Array.from(popup.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(popup, inputElement, rest);
  });

  disableButtonSubmit(buttonSaveElement, validationConfig);
};
  
const checkInputValidity = (popup, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(popup, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(popup, inputElement, validationConfig);
  }
};
       
const setEventListeners = (popup, validationConfig) => {
  const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
  const buttonSaveElement = popup.querySelector(validationConfig.buttonSaveSelector);
   
  toggleButtonState(inputList, buttonSaveElement, validationConfig);
   
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popup, inputElement, validationConfig);

      toggleButtonState(inputList, buttonSaveElement, validationConfig);
    });
  });
};
    
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonSaveElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButtonSubmit(buttonSaveElement, validationConfig);
  } else {
    enableButtonSubmit(buttonSaveElement, validationConfig);
  }
};
    
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((popup) => {
        
    popup.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
        
    setEventListeners(popup, validationConfig)
  });
}; 

enableValidation(validationConfig);