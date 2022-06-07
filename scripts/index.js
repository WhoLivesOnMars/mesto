const popup = document.querySelector('.popup')
const editFormElement = document.querySelector('.edit-form');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = editFormElement.querySelector('.edit-form__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__content');
const popupContainer = document.querySelector('.popup__container');
// const formInput = formElement.querySelector('.popup__input');
// const formError = formElement.querySelector(`.${formInput.id}-error`);
const nameInput = popupContainer.querySelector('.edit-form__input_type_username');
const jobInput = popupContainer.querySelector('.edit-form__input_type_description');
const addButton = document.querySelector('.profile__add-button');
const newItemElement = document.querySelector('.item-form');
// const popupContainerPlace = document.querySelector('.edit-form__container'); 
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
const closePic = document.querySelector('.picture-viewer__close-button');
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

  return task;
}

closePic.addEventListener('click', () => closePopup(viewerElement));

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

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent; 
  openPopup(editFormElement);
});
  
closeButton.addEventListener('click', () => closePopup(editFormElement));
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editFormElement);
}

formElement.addEventListener('submit', formSubmitHandler);

/*---------- Попап добавления карточки --------------*/

addButton.addEventListener('click', () => {
  openPopup(newItemElement)
});

closeForm.addEventListener('click', () => closePopup(newItemElement));

/*------ Валидация формы ------*/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};
  
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
   
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonSaveElement = formElement.querySelector('.popup__save-button');

  // toggleButtonState(inputList, buttonSaveElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonSaveElement);
    });
  });
};
setEventListeners(formElement); 

/* function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup'));
  formList.forEach((formElement) => {
    
     setEventListeners(formElement);
  });
}; */

  
/* formInput.addEventListener('input', function () {
  checkInputValidity(form, formInput);
}); */

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