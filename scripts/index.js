const formEditElement = document.querySelector('.edit-form');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseRedaction = formEditElement.querySelector('.edit-form__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__content');
const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.edit-form__input_type_username');
const jobInput = popupContainer.querySelector('.edit-form__input_type_description');
const buttonAdd = document.querySelector('.profile__add-button');
const itemNewElement = document.querySelector('.item-form');
const titleInput = document.querySelector('.item-form__input_type_title');
const linkInput = document.querySelector('.item-form__input_type_link');
const buttonCloseAdding = itemNewElement.querySelector('.item-form__close-button');
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
      name: 'Гамсутль',
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
const formAddingCard = document.querySelector('.item-form__content');
const picViewerClose = document.querySelector('.picture-viewer__close-button');
const zoomPic = document.querySelector('.picture-viewer__image');
const zoomCapture = document.querySelector('.popup__capture');
// const buttonClose = document.querySelectorAll('.popup__close-button');
const popupList = Array.from(document.querySelectorAll('.popup'));

/*---------- Открытие/закрытие попапов ------------*/

function closeByEsc(event){ 
  if (event.key === "Escape") {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEsc);
} 

function closePopup(popup) {
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

/* buttonClose.forEach(function(item){
  item.addEventListener ('click', function (evt) {

  })
}) */

/*------------ Карточки "из коробки" --------------*/

const createBlock = (card) => {
  const task = template.content.querySelector('.elements__cell').cloneNode(true);
  const picture = task.querySelector('.elements__item');
  task.querySelector('.elements__title').textContent = card.name;
  picture.src = card.link;
  picture.alt = card.name;
  
  task.querySelector('.elements__delete-button').addEventListener('click', () => {
    task.remove();
  });

  task.querySelector('.elements__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like-button_active');
  });
  
  picture.addEventListener('click', () => {
    zoomCapture.textContent = card.name;
    zoomPic.src = card.link;
    zoomPic.alt = card.name;
    openPopup(viewerElement);
  });

  return task;
}

picViewerClose.addEventListener('click', () => closePopup(viewerElement));

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
closePopup(itemNewElement);
}

formAddingCard.addEventListener('submit', addNewCard);

/*------- Попап редактирования информации в профиле -------*/

buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
  openPopup(formEditElement);
});
  
buttonCloseRedaction.addEventListener('click', () => closePopup(formEditElement));
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(formEditElement);
}

formElement.addEventListener('submit', formSubmitHandler);

/*---------- Попап добавления карточки --------------*/

buttonAdd.addEventListener('click', () => {

    
  openPopup(itemNewElement)
});

buttonCloseAdding.addEventListener('click', () => closePopup(itemNewElement));