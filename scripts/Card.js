import { openPopup, closePopup, viewerElement, zoomPic, zoomCaption, picViewerClose } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  };
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__cell')
      .cloneNode(true);
  
    return cardElement;
  };
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.elements__title').textContent = this._name;
    this._image = this._element.querySelector('.elements__item');
    this._image.src = this._link;
    this._image.alt = this._name;
  
    return this._element;
  };

  _handleOpenPopup() {
    zoomPic.src = this._link;
    zoomPic.alt = this._name;
    zoomCaption.textContent = this._name;
    openPopup(viewerElement);
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  _deleteCard() {
    this._element.remove();
  };

  _handleClosePopup() {
    zoomPic.src = '';
    zoomPic.alt = '';
    zoomCaption.textContent = '';
    closePopup(viewerElement);
  };

  _setEventListeners() {
    this._element.querySelector('.elements__item').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    picViewerClose.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }
}

/* formAddingCard.addEventListener('submit', (evt) => {
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
    
  initialCards.forEach((item) => {
    const card = new Card(item, '.elements-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__cells').append(cardElement);
  }); */