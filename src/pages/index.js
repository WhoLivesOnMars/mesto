import '../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import { initialCards, validationConfig } from '../scripts/initial.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { formEditInfo, buttonEdit, profileName, profileDescription, nameInput, jobInput, buttonAdd, formAddingCard } from '../scripts/constants.js';

/*---------- Открытие/закрытие попапов ------------*/


/*------------ Карточки "из коробки" --------------*/

const cardList = new Section({ items: initialCards, renderer: (item) => {
  const card = new Card(item, '.elements-template', () => {imagePopup.open(item)});
  const cardElement = card.generateCard();
  cardList.addItem(cardElement, 'end');
}}, '.elements__cells');
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

function createNewCard(item, place) { 
  const card = new Card(item, '.elements-template', () => {imagePopup.open(item)}); 
  const cardElement = card.generateCard(); 
  cardList.addItem(cardElement, place);
};

buttonAdd.addEventListener('click', function() { 
    const popupWithFormPlace = new PopupWithForm({ popupSelector: '.item-form',
    
      handlerSubmitForm: (formData) => {
        /* const dataValue = [{
          name: formData.title,
          link: formData.link
        }]; */
        createNewCard(formData, 'start');
        popupWithFormPlace.close();
      }
    });

    formAddingCardValidator.resetFormValidation(); 
    popupWithFormPlace.open();
    popupWithFormPlace.setEventListeners();
    formAddingCard.reset();
}); 

/*------- Попап редактирования информации в профиле -------*/

buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  const userInfo = new UserInfo({ username: '.profile__title', description: '.profile__subtitle' });
  const popupWithFormEdit = new PopupWithForm({ popupSelector: '.edit-form',
    handlerSubmitForm: (formData) => {
      userInfo.setUserInfo(formData);
      popupWithFormEdit.close();
    }
  });
  formEditInfoValidator.resetFormValidation();
  popupWithFormEdit.open();
  popupWithFormEdit.setEventListeners();
});