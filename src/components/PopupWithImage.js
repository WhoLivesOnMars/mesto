import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._image = document.querySelector('.elements__item');
    // this._title = document.querySelector('.card__title');
  };

  open({ name, link }) {  
    const popupPic = this._popup.querySelector('.picture-viewer__image');
    const popupCaption = this._popup.querySelector('.popup__caption');
    popupPic.src = link;
    popupPic.alt = name;
    popupCaption.textContent = name;

    /*
     this._image.src = link;
     this._image.alt = name;
     this._title.textContent = name;
    */

    super.open();
  };
}