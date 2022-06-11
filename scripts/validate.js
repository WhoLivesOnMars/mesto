/*------ Валидация формы ------*/

const showInputError = (popup, inputElement, errorMessage) => {
  const errorElement = popup.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};
    
const hideInputError = (popup, inputElement) => {
  const errorElement = popup.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};
    
const checkInputValidity = (popup, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(popup, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popup, inputElement);
  }
};
     
const setEventListeners = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  const buttonSaveElement = popup.querySelector('.popup__save-button');
 
  toggleButtonState(inputList, buttonSaveElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popup, inputElement);

      toggleButtonState(inputList, buttonSaveElement);
    });
  });
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
    
const toggleButtonState = (inputList, buttonSaveElement) => {
  if (hasInvalidInput(inputList)) {
    buttonSaveElement.classList.add('popup__save-button_inactive');
  } else {
    buttonSaveElement.classList.remove('popup__save-button_inactive');
  }
};
  
function enableValidation(popup) {
  const formList = Array.from(document.querySelectorAll('.popup__content'));
  formList.forEach((popup) => {
      
    popup.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    const fieldsetList = Array.from(popup.querySelectorAll('.popup__fieldset'));
      
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};
  
enableValidation();