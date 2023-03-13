import '../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import { initialCards, validationConfig } from '../scripts/initial.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { formEditInfo, buttonEdit, nameInput, jobInput, buttonAdd, formAddingCard } from '../scripts/constants.js';


/*------------ Карточки "из коробки" --------------*/

function createNewCard(item) { 
  const card = new Card(item, '.elements-template', () => {imagePopup.open(item)});
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section({ items: initialCards,
  renderer: (item) => cardList.addItem(createNewCard(item), 'end')
}, '.elements__cells');
cardList.renderItems();

/*------------ Попап с изображением --------------*/

const imagePopup = new PopupWithImage('.picture-viewer');
imagePopup.setEventListeners();

/*------------ Валидация форм --------------*/

const formEditInfoValidator = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidator.enableValidation();

const formAddingCardValidator = new FormValidator(validationConfig, formAddingCard);
formAddingCardValidator.enableValidation();

/*------------ Добавление новой карточки --------------*/

const popupWithFormPlace = new PopupWithForm({ popupSelector: '.item-form',    
handlerSubmitForm: (item) => {
  cardList.addItem(createNewCard(item), 'start')
  popupWithFormPlace.close();
}
});
popupWithFormPlace.setEventListeners();

buttonAdd.addEventListener('click', function() { 
    formAddingCardValidator.resetFormValidation(); 
    popupWithFormPlace.open();
}); 

/*------- Попап редактирования информации в профиле -------*/

const userInfo = new UserInfo({ username: '.profile__title', description: '.profile__subtitle' });

const popupWithFormEdit = new PopupWithForm({ popupSelector: '.edit-form',
handlerSubmitForm: (formData) => {
  userInfo.setUserInfo(formData);
  popupWithFormEdit.close();
}
});
popupWithFormEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
  formEditInfoValidator.resetFormValidation();
  popupWithFormEdit.open();

  const userData = userInfo.getUserInfo();

  nameInput.value = userData.username;
  jobInput.value = userData.description;
});