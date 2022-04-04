const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

function openPopup() {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}
 


function closePopup() {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp)
}
function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

editButton.addEventListener('click', openPopup);
  
closeButton.addEventListener('click', closePopup);
const ESC_KEY = "Escape";

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__input_type_username');
const jobInput = popupContainer.querySelector('.popup__input_type_description');
const submitButton = document.querySelector('.popup__save-button')

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupElement.classList.remove('popup_opened');
   
}

submitButton.addEventListener('click', formSubmitHandler);