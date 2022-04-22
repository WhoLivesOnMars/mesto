const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__content');
const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__input_type_username');
const jobInput = popupContainer.querySelector('.popup__input_type_description');
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

const createBlock = (card) => {
  const template = document.querySelector('.elements-template');
  const task = template.content.querySelector('.elements__cell').cloneNode(true);
  const cardPic = task.querySelector('.elements__item');
  task.querySelector('.elements__title').textContent = card.name;
  cardPic.src = card.link;
  cardPic.alt = card.name;
  return task;
}

 
const elements = initialCards.map(function(card) {
  return createBlock(card);
})
cardContainer.append(...elements)

   
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
  
function formSubmitHandler (evt) {
  evt.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupElement.classList.remove('popup_opened'); 
}

formElement.addEventListener('submit', formSubmitHandler);