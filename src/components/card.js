import { openPopup } from "./modal";

// Функция создания карточки
const createCard = (
  cardData,
  handleDeleteCard,
  toggleLikeCard,
  handleOpenPopupCard
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonBasketDeleteCard = cardNew.querySelector(".card__delete-button");
  const buttonLikeCards = cardNew.querySelector(".card__like-button");
  const cardImage = cardNew.querySelector(".card__image");
  const cardTitle = cardNew.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  buttonBasketDeleteCard.addEventListener("click", (evt) => {
    handleDeleteCard(evt);
    evt.stopPropagation();
  });

  buttonLikeCards.addEventListener("click", (evt) => {
    toggleLikeCard(evt);
    evt.stopPropagation();
  });

  cardImage.addEventListener("click", (evt) => handleOpenPopupCard(evt));

  return cardNew;
};

// Функция удаления карточки
const handleDeleteCard = (evt) => {
  const cardForDelete = evt.target.closest(".card");
  cardForDelete.remove();
  evt.target.removeEventListener("click", (evt) => {
    handleDeleteCard(evt);
    evt.stopPropagation();
  });
};

//Функция добавления лайка
const toggleLikeCard = (evt) => {
  const buttonLike = evt.target.closest(".card__like-button");
  buttonLike.classList.toggle("card__like-button_is-active");
};

// Функция открытия попапа с картинкой
const handleOpenPopupCard = (evt) => {
  const popupCard = document.querySelector(".popup_type_image");
  const popupImage = popupCard.querySelector(".popup__image");
  const popupTitle = popupCard.querySelector(".popup__caption");
  const cardImageSrc = evt.target.src;
  const cardTitle =
    evt.target.parentElement.querySelector(".card__title").textContent;
  popupImage.src = cardImageSrc;
  popupTitle.textContent = cardTitle;
  openPopup(popupCard);
};

export { createCard, handleDeleteCard, toggleLikeCard, handleOpenPopupCard };
