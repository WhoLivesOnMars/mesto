const popup = document.querySelector('.popup')
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
const viewerElement = document.querySelector('.picture-viewer');
const template = document.querySelector('.elements-template');
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
const openPic = document.querySelector('.picture-viewer');
const closePic = document.querySelector('.picture-viewer__close-button');
const zoomPic = document.querySelector('.picture-viewer__image');
const zoomCapture = document.querySelector('.popup__capture');

/*---------- Открытие/закрытие попапов ------------*/

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/* function openModalPic (card) {
  // openPic.classList.add('picture-viewer_opened');
  openPopup(popup);
  zoomCapture.textContent = card.name;
  zoomPic.src = card.link;
} */

/* function closeModalPic() {
  openPic.classList.remove('picture-viewer_opened');
} */

/*------------ Карточки "из коробки" --------------*/

const createBlock = (card) => {
  const task = template.content.querySelector('.elements__cell').cloneNode(true);
  task.querySelector('.elements__title').textContent = card.name;
  task.querySelector('.elements__item').src = card.link;
  task.querySelector('.elements__item').alt = card.name;
  
  task.querySelector('.elements__delete-button').addEventListener('click', () => {
    task.remove();
  });

  task.querySelector('.elements__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like-button');
    evt.target.classList.toggle('elements__like-button_active');
  });
  
  task.querySelector('.elements__item').addEventListener('click', () => {
    zoomCapture.textContent = card.name;
    zoomPic.src = card.link;
    zoomPic.alt = card.name;
    openPopup(viewerElement);
  });
  // cardPic.addEventListener('click', () => openModalPic(card));
  closePic.addEventListener('click', () =>
  closePopup(viewerElement));

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
closePopup(newItemElement);
}

addNewCardForm.addEventListener('submit', addNewCard);

/*------- Попап редактирования информации в профиле -------*/

/* function openUserPopup() {
  // editFormElement.classList.add('popup_opened'); 
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
} */
 
/* function closePopup() {
  editFormElement.classList.remove('popup_opened');
} */

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
  openPopup(editFormElement);
});
  
closeButton.addEventListener('click', closePopup);
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // editFormElement.classList.remove('popup_opened');
  closePopup(editFormElement);
}

formElement.addEventListener('submit', formSubmitHandler);

/*---------- Попап добавления карточки --------------*/

/* function openItemForm() {
  // newItemElement.classList.add('item-form_opened');
  openPopup(popup);
  titleInput.value;
  linkInput.value;
} */

/* function closeItemForm() {
  newItemElement.classList.remove('item-form_opened');
} */
  
addButton.addEventListener('click', () => {
  // titleInput.value;
  // linkInput.value; 
  openPopup(newItemElement)
});

closeForm.addEventListener('click', closePopup);

 /*---------- Открытие попапа с картинкой ------------*/

// closeForm.addEventListener('click', closePopup);