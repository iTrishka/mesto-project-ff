import "../pages/index.css";
import initialCards from "./cards";
import {
  createCard,
  handleDeleteCard,
  toggleLikeCard,
  handleOpenPopupCard,
} from "../components/card";
import { openPopup, closePopup } from "../components/modal";

// DOM узлы
const placesList = document.querySelector(".places__list");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formAddNewCard = document.forms["new-place"];
const formEditProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupProfileName = formEditProfile.elements.name;
const popupProfileDescription = formEditProfile.elements.description;

// Вывести карточки на страницу
const addCardsOnPage = (cardsData) => {
  cardsData.forEach((cardData) => {
    placesList.append(
      createCard(
        cardData,
        handleDeleteCard,
        toggleLikeCard,
        handleOpenPopupCard
      )
    );
  });
};

addCardsOnPage(initialCards);

//Cлушатели для попапов редактирования профиля и добавления новой карточки
buttonAddNewCard.addEventListener("click", () => handlePopupAddNewCardOpen());
buttonEditProfile.addEventListener("click", () => handlePopupEditProfileOpen());

//Обработчик клика открытия попапа для редактирования профиля
const handlePopupEditProfileOpen = () => {
  popupProfileName.value = profileTitle.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  formEditProfile.addEventListener("submit", handleProfileFormSubmit);
};

//Обработчик события submit редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  formEditProfile.reset();
  closePopup(popupEditProfile);
  formEditProfile.removeEventListener("submit", handleProfileFormSubmit);
}

//Обработчик клика открытия попапа для добавления новой карточки
const handlePopupAddNewCardOpen = () => {
  openPopup(popupAddNewCard);
  formAddNewCard.addEventListener("submit", handleAddCardFormSubmit);
};

//Обработчик события submit добавления новой карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const popupCardPlaceName = formAddNewCard.elements["place-name"];
  const popupCardLink = formAddNewCard.elements.link;

  const cardData = {
    name: popupCardPlaceName.value,
    link: popupCardLink.value,
  };
  placesList.prepend(
    createCard(cardData, handleDeleteCard, toggleLikeCard, handleOpenPopupCard)
  );
  formAddNewCard.reset();
  closePopup(popupAddNewCard);
  formAddNewCard.removeEventListener("submit", handleAddCardFormSubmit);
};
