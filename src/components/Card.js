export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
     
    this._element.querySelector('.elements__title').textContent = this._name;
    this._image = this._element.querySelector('.elements__item');
    this._image.src = this._link;
    this._image.alt = this._name;
  
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    
    this._setEventListeners();

    return this._element;
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  _deleteCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}