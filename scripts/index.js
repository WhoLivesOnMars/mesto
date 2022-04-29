const editFormElement = document.querySelector('.edit-form');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = editFormElement.querySelector('.edit-form__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__content');
const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.edit-form__input_type_username');
const jobInput = popupContainer.querySelector('.edit-form__input_type_description');
const addButton = document.querySelector('.profile__add-button');
const newItemElement = document.querySelector('.item-form');
const popupContainerPlace = document.querySelector('.edit-form__container'); 
const titleInput = document.querySelector('.item-form__input_type_title');
const linkInput = document.querySelector('.item-form__input_type_link');
const closeForm = newItemElement.querySelector('.item-form__close-button');
const initialCards = [
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1584041419725-eb8897c8d46a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=410&q=80'
    },
    {
      name: 'Роза Хутор',
      link: 'https://images.unsplash.com/photo-1605789097480-10434f896946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
      name: 'Дагестан',
      link: 'https://images.unsplash.com/photo-1634715109536-cb9a1bb02cec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Великий Новгород',
      link: 'https://images.unsplash.com/photo-1632395878042-46f162829aee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Казань',
      link: 'https://images.unsplash.com/photo-1584270692240-0411d322e4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=408&q=80'
    },
    {
      name: 'Владивосток',
      link: 'https://images.unsplash.com/photo-1629813366051-b58137b2792c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    }
  ];

const cardContainer = document.querySelector('.elements__cells');
const addNewCardForm = document.querySelector('.item-form__content');

/*------------ Карточки "из коробки" --------------*/

const createBlock = (card) => {
  const template = document.querySelector('.elements-template');
  const task = template.content.querySelector('.elements__cell').cloneNode(true);
  const cardPic = task.querySelector('.elements__item');
  task.querySelector('.elements__title').textContent = card.name;
  cardPic.src = card.link;
  cardPic.alt = card.name;
  
  task.querySelector('.elements__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like-button');
    evt.target.classList.toggle('elements__like-button_active');
  });
  
  return task;
}

const elements = initialCards.map(function(card) {
    return createBlock(card);
  })
  cardContainer.append(...elements)

/*------------ Добавление новой карточки --------------*/

const renderCard = (card) => {
 cardContainer.prepend(createBlock(card));
};
    
const addNewCard = (event) => {
event.preventDefault();
const card = {};
card.name = titleInput.value;
card.link = linkInput.value;
renderCard(card);
titleInput.value = '';
linkInput.value = '';
closeItemForm(newItemElement);
}

addNewCardForm.addEventListener('submit', addNewCard);

/*------- Попап редактирования информации в профиле -------*/

function openPopup() {
  editFormElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
}
 
function closePopup() {
  editFormElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
  
closeButton.addEventListener('click', closePopup);
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  editFormElement.classList.remove('popup_opened'); 
}

formElement.addEventListener('submit', formSubmitHandler);

/*---------- Попап добавления карточки --------------*/

function openItemForm() {
  newItemElement.classList.add('item-form_opened');
  titleInput.value;
  linkInput.value;
}

function closeItemForm() {
  newItemElement.classList.remove('item-form_opened');
}
  
addButton.addEventListener('click', openItemForm);

closeForm.addEventListener('click', closeItemForm);

/*------------------ Лайк карточки --------------------*/



const likeButton = document.querySelectorAll('.element__like');
function like() {
    likeButton.forEach(function (evt) {
       evt.target.classList.toggle('element__like_active');
    });
 }
 likeButton.addEventListener('click', like);