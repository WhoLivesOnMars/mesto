export default class Card {
  constructor({ name, link, owner, _id, likes }, cardSelector, handleCardClick, userId, handleDeleteCard, handleLike) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.userId = userId
    this._isOwner = owner._id === userId;
    this._cardId = _id;
    this._likes = likes;
    this._hasMyLike = this._likes.some(elm => elm._id === this.userId)
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardImage = this._element.querySelector('.elements__item');
    this._buttonLike = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
  };
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__cell')
      .cloneNode(true);
  
    return cardElement;
  };
  
  updateLikes(likes) {
    this._hasMyLike = likes.some(elm => elm._id === this.userId)
    this._likeCounter.textContent = likes.length;
    this._buttonLike.classList.toggle('elements__like-button_active');
  }

  _handleLikeClick() {
    if (this._hasMyLike) {
      this._handleLike.deleteLike(this._cardId, this);
    } else {
      this._handleLike.addLike(this._cardId, this);
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    if (this._isOwner) {
      this._deleteButton.addEventListener('click', () => this._handleDeleteCard({ id: this._cardId, element: this }));
    }
    this._cardImage.addEventListener('click', () => this._handleCardClick({ name: this._name, link: this._link }));
  }

  generateCard() {  
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  
    if (this._hasMyLike) this._buttonLike.classList.add('elements__like-button_active');
    this._likeCounter.textContent = this._likes.length
    if (!this._isOwner) {
        this._deleteButton.classList.add('elements__delete-button_inactive');
    }
    this._setEventListeners();

    return this._element;
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  deleteCards() {
    this._element.remove();
    this._element = null;
  };
}