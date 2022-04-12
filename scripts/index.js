const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__content');
const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__input_type_username');
const jobInput = popupContainer.querySelector('.popup__input_type_description');

function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
}
 
function closePopup() {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
  
closeButton.addEventListener('click', closePopup);

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupElement.classList.remove('popup_opened'); 
}

formElement.addEventListener('submit', formSubmitHandler);