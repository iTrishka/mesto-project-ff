// Функция открытия модального окна
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEventClosePopup);
  popup.addEventListener("click", handleEventClosePopup);
};

// Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEventClosePopup);
  popup.removeEventListener("click", handleEventClosePopup);
};

// Обработчик клика закрытия модального окна
const handleEventClosePopup = (evt) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  const buttonClosePopup = openedPopup.querySelector(".popup__close");
  const popupContent = openedPopup.querySelector(".popup__content");
  if (
    evt.type === "click" &&
    (evt.target === buttonClosePopup || !popupContent.contains(evt.target))
  ) {
    closePopup(openedPopup);
  } else if (evt.type === "keydown" && evt.key === "Escape") {
    closePopup(openedPopup);
  }
};

export { openPopup, closePopup };
