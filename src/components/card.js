import { openPopup } from "./modal";
import {
  cardTemplate,
  popupCard,
  popupCardImage,
  popupCardTitle,
} from "./constants";

// Функция создания карточки
const createCard = (
  cardData,
  deleteCard,
  toggleLikeCard,
  handleOpenPopupCard,
  userId
) => {
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonBasketDeleteCard = cardNew.querySelector(".card__delete-button");
  const buttonLikeCard = cardNew.querySelector(".card__like-button");
  const cardImage = cardNew.querySelector(".card__image");
  const cardTitle = cardNew.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  buttonBasketDeleteCard.addEventListener("click", (evt) => {
    deleteCard(cardNew);
    evt.stopPropagation();
  });

  if(cardData.owner._id === userId){
    hideLikeBtn(buttonLikeCard);
  }else {
    buttonLikeCard.addEventListener("click", (evt) => {
      toggleLikeCard(evt);
      evt.stopPropagation();
    });
  }

  cardImage.addEventListener("click", () => handleOpenPopupCard(cardData));

  return cardNew;
};

//Функция удаления карточки
const deleteCard = (card) => card.remove();

//Функция добавления лайка
const toggleLikeCard = (evt) => {
  const buttonLike = evt.target.closest(".card__like-button");
  buttonLike.classList.toggle("card__like-button_is-active");
};

//Обработчик клика открытия попапа с картинкой
const handleOpenPopupCard = (cardData) => {
  popupCardImage.src = cardData.link;
  popupCardImage.alt = cardData.name;
  popupCardTitle.textContent = cardData.name;
  openPopup(popupCard);
};

//Функция скрытия лайка
const hideLikeBtn = (buttonLikeCard) => {
  buttonLikeCard.classList.add(buttonLikeCard);
}

export { createCard, deleteCard, toggleLikeCard, handleOpenPopupCard };
