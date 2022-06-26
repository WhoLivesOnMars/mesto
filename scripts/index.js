import Card from './Card.js';
import { initialCards, validationConfig } from './initial.js';
import FormValidator from './FormValidator.js';

const formEditElement = document.querySelector('.edit-form');
const formEditInfo = document.querySelector('.edit-form__content');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseRedaction = formEditElement.querySelector('.edit-form__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const nameInput = formEditElement.querySelector('.edit-form__input_type_username');
const jobInput = formEditElement.querySelector('.edit-form__input_type_description');
const buttonAdd = document.querySelector('.profile__add-button');
const itemNewElement = document.querySelector('.item-form');
const titleInput = document.querySelector('.item-form__input_type_title');
const linkInput = document.querySelector('.item-form__input_type_link');
const buttonCloseAdding = itemNewElement.querySelector('.item-form__close-button');
export const viewerElement = document.querySelector('.picture-viewer');

const cardContainer = document.querySelector('.elements__cells');
const formAddingCard = document.querySelector('.item-form__content');
export const picViewerClose = document.querySelector('.picture-viewer__close-button');
export const zoomPic = document.querySelector('.picture-viewer__image');
export const zoomCaption = document.querySelector('.popup__caption');
const popupList = Array.from(document.querySelectorAll('.popup'));

/*---------- Открытие/закрытие попапов ------------*/

function closeByEsc(event){ 
  if (event.key === "Escape") {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEsc);
} 

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEsc);
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
    }
  });
})

/*------------ Карточки "из коробки" --------------*/

initialCards.forEach((item) => {
  const card = new Card(item, '.elements-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__cells').append(cardElement);
});

/*------------ Валидация форм --------------*/

const formEditInfoValidator = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidator.enableValidation();

const formAddingCardValidator = new FormValidator(validationConfig, formAddingCard);
formAddingCardValidator.enableValidation();

/*------------ Добавление новой карточки --------------*/

formAddingCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {};
  newCard.name = titleInput.value;
  newCard.link = linkInput.value;
  const card = new Card(newCard, '.elements-template');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(itemNewElement);
});

/*------- Попап редактирования информации в профиле -------*/

buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formEditInfoValidator.resetFormValidation();
  openPopup(formEditElement);
});
  
buttonCloseRedaction.addEventListener('click', () => closePopup(formEditElement));
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(formEditElement);
}

formEditInfo.addEventListener('submit', formSubmitHandler);

/*---------- Попап добавления карточки --------------*/

buttonAdd.addEventListener('click', () => {
  formAddingCard.reset();
  formAddingCardValidator.resetFormValidation();

  openPopup(itemNewElement);
});

buttonCloseAdding.addEventListener('click', () => closePopup(itemNewElement));