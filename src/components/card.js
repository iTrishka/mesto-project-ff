import { openPopup } from "./modal";
import {
  cardTemplate,
  popupCard,
  popupCardImage,
  popupCardTitle,
} from "./constants";

import { addLikeCard, removeLikeCard } from "../scripts/api";

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
  const cardLikesCounter = cardNew.querySelector(".card__like-counter");
  const cardImage = cardNew.querySelector(".card__image");
  const cardTitle = cardNew.querySelector(".card__title");

  cardNew.dataset.id = cardData._id;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  showLikesCount(cardLikesCounter, cardData.likes);
  if (cardData.likes.some((user) => user._id === userId)) {
    buttonLikeCard.classList.add("card__like-button_is-active");
  }

  hidebuttonDeleteCard(userId, cardData.owner._id, buttonBasketDeleteCard);

  buttonBasketDeleteCard.addEventListener("click", (evt) => {
    evt.stopPropagation();
    deleteCard(cardData._id)
      .then((result) => {
        cardNew.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  buttonLikeCard.addEventListener("click", (evt) => {
    toggleLikeCard(userId, cardData, buttonLikeCard, cardLikesCounter);
    evt.stopPropagation();
  });

  cardImage.addEventListener("click", () => handleOpenPopupCard(cardData));

  return cardNew;
};

//Обработчик клика открытия попапа с картинкой
const handleOpenPopupCard = (cardData) => {
  popupCardImage.src = cardData.link;
  popupCardImage.alt = cardData.name;
  popupCardTitle.textContent = cardData.name;
  openPopup(popupCard);
};

//Функция показать количество лайков
const showLikesCount = (fieldLikesCount, arrayLikes) => {
  fieldLikesCount.textContent = arrayLikes.length;
};

//Функция добавления лайка
const toggleLikeCard = (idUser, card, buttonLike, fieldLikesCount) => {
  if (card.likes.some((user) => user._id === idUser)) {
    removeLikeCard(card._id)
      .then((result) => {
        card.likes = result.likes;
        showLikesCount(fieldLikesCount, result.likes);
        buttonLike.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeCard(card._id)
      .then((result) => {
        card.likes = result.likes;
        showLikesCount(fieldLikesCount, result.likes);
        buttonLike.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Функция скрытия кнопки удаления карточки
const hidebuttonDeleteCard = (idUser, idCard, buttonDeleteCard) => {
  if (idUser !== idCard) {
    buttonDeleteCard.classList.add("card__delete-button_hidden");
  }
};

export { createCard, toggleLikeCard, handleOpenPopupCard };
