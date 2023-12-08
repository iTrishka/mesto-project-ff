import "../pages/index.css";
import initialCards from "./cards";
import {
  createCard,
  deleteCard,
  toggleLikeCard,
  handleOpenPopupCard,
} from "../components/card";
import { openPopup, closePopup } from "../components/modal";
import {
  placesList,
  popupAddNewCard,
  popupEditProfile,
  buttonAddNewCard,
  buttonEditProfile,
  formAddNewCard,
  formAddNewCardName,
  formAddNewCardLink,
  formEditProfile,
  profileTitle,
  profileDescription,
  popupProfileName,
  popupProfileDescription,
} from "../components/constants";

// Вывести карточки на страницу
const addCardsOnPage = (cardsData) => {
  cardsData.forEach((cardData) => {
    placesList.append(
      createCard(cardData, deleteCard, toggleLikeCard, handleOpenPopupCard)
    );
  });
};

addCardsOnPage(initialCards);

//Cлушатели для попапов редактирования профиля и добавления новой карточки
buttonAddNewCard.addEventListener("click", handlePopupAddNewCardOpen);
formAddNewCard.addEventListener("submit", handleAddCardFormSubmit);
buttonEditProfile.addEventListener("click", handlePopupEditProfileOpen);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//Обработчик клика открытия попапа для редактирования профиля
function handlePopupEditProfileOpen() {
  popupProfileName.value = profileTitle.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

//Обработчик события submit редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  formEditProfile.reset();
  closePopup(popupEditProfile);
}

//Обработчик клика открытия попапа для добавления новой карточки
function handlePopupAddNewCardOpen() {
  openPopup(popupAddNewCard);
}

//Обработчик события submit добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: formAddNewCardName.value,
    link: formAddNewCardLink.value,
  };
  placesList.prepend(
    createCard(cardData, deleteCard, toggleLikeCard, handleOpenPopupCard)
  );
  formAddNewCard.reset();
  closePopup(popupAddNewCard);
}
