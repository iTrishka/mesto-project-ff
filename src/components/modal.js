// Функция открытия модального окна
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => handleEventClosePopup(popup, evt))
  popup.addEventListener('click', (evt) => handleEventClosePopup(popup, evt))
}

// Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
}

// Обработчик клика закрытия модального окна
const handleEventClosePopup = (popup, evt = undefined) =>{
  const buttonClosePopup = popup.querySelector('.popup__close');
  const popupContent = popup.querySelector('.popup__content');
  if(evt.type === 'click' && (evt.target === buttonClosePopup  || !popupContent.contains(evt.target))){
    closePopup(popup);
    popup.removeEventListener('click', (evt) => closePopup(popup));
  } else if(evt.type === 'keydown' && evt.key === 'Escape'){
    closePopup(popup);
    document.removeEventListener('keydown', (evt) => closePopup(popup));
  }
}

export {openPopup, closePopup}; 