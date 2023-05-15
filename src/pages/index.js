import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import { validationConfig } from '../scripts/initial.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelConfirmation from '../components/PopupDelConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import { formEditInfo, formEditAvatar, buttonEdit, nameInput, jobInput, buttonAdd, formAddingCard, buttonSaveProfile, buttonSaveNewCard, buttonEditAvatar, buttonSaveAvatar, buttonDeleteCard } from '../scripts/constants.js';
import Api from '../components/Api.js'

let userId;

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
  "866fe9f0-4d98-459d-be3c-e0eb033eaee2"
);

Promise.all([api.getCards(), api.getCurrentUser()])
  .then(([item, user]) => {
    userInfo.setAvatar(user.avatar);
    userId = user._id;
    cardList.renderItems(item);
    userInfo.setUserInfo({ user })
  })
  .catch((err) => {
    console.log(err);
  });

/*------------ Валидация форм --------------*/

const formEditInfoValidator = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidator.enableValidation();

const formAddingCardValidator = new FormValidator(validationConfig, formAddingCard);
formAddingCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();

/*------- Обновление аватара пользователя в профиле -------*/

const popupSetAvatar = new PopupWithForm({ popupSelector: '.popup_type_edit-avatar', 
handlerSubmitForm: setNewAvatar})

function setNewAvatar(input) {
  popupSetAvatar.renderLoading(true);
  api.setNewAvatar(input)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupSetAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
     popupSetAvatar.renderLoading(false);
    })
}

popupSetAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.resetFormValidation();
  popupSetAvatar.open();
})

/*------- Попап редактирования информации в профиле -------*/

const userInfo = new UserInfo({ username: '.profile__title', description: '.profile__subtitle', avatar: '.profile__avatar' });

const popupWithFormEdit = new PopupWithForm({ popupSelector: '.edit-form',
handlerSubmitForm: (userData) => {
  popupWithFormEdit.renderLoading(true);
  api.setUserInfo({ item: userData })
    .then((res) => {
      userInfo.setUserInfo({ data: res });
      popupWithFormEdit.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => { 
      popupWithFormEdit.renderLoading(false)
    })
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

/*------------ Карточки "из коробки" --------------*/

function createNewCard(item) { 
  const card = new Card(
    item,
    '.elements-template',
    () => {imagePopup.open(item)},
    userId,
    handleDeleteCard,
    handleLike
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section({ 
  renderer: (item) => cardList.addItem(createNewCard(item), 'end')
}, '.elements__cells');

/*------------ Добавление новой карточки --------------*/

const popupWithFormPlace = new PopupWithForm({ popupSelector: '.item-form',    
  handlerSubmitForm: (item) => {
    popupWithFormPlace.renderLoading(true);
    api.addNewCard({ item })
      .then((item) => {
        cardList.addItem(createNewCard(item), 'start');
        popupWithFormPlace.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormPlace.renderLoading(false);
      })
  }
});
popupWithFormPlace.setEventListeners();

buttonAdd.addEventListener('click', function() { 
  formAddingCardValidator.resetFormValidation(); 
  popupWithFormPlace.open();
}); 

/*------- Постановка и снятие лайка -------*/

const handleLike = {
  addLike: (ip, element) => addLike(ip, element),
  deleteLike: (ip, element) => deleteLike(ip, element)
}

function addLike(cardId, element) {
  api.addLike(cardId)
    .then(res => element.updateLikes(res.likes))
    .catch(err => {
      console.log(err);
    })
}

function deleteLike(cardId, element) {
  api.deleteLike(cardId)
    .then(res => element.updateLikes(res.likes))
    .catch(err => {
      console.log(err);
    })
}

/*------------ Удаление карточки --------------*/

const popupDeleteCard = new PopupDelConfirmation('.popup_type_delete');
popupDeleteCard.setEventListeners();

function deleteCards(id, element) {
  popupDeleteCard.renderLoading(true);
  api.deleteCards(id)
    .then(() => {
      element.deleteCards();
      popupDeleteCard.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupDeleteCard.renderLoading(false);
    })
 }

function handleDeleteCard({ id, element }) {
  popupDeleteCard.setCallback(() => deleteCards(id, element))
  popupDeleteCard.open()
}

/*------------ Попап с изображением --------------*/

const imagePopup = new PopupWithImage('.picture-viewer');
imagePopup.setEventListeners();