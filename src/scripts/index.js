import "../pages/index.css";
import {
  createCard,
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
  buttonSubmitPopup,
  formAddNewCard,
  formAddNewCardName,
  formAddNewCardLink,
  formEditProfile,
  profileTitle,
  profileDescription,
  profileAvatar,
  popupProfileName,
  popupProfileDescription,
  popupEditAvatar,
  formEditAvatar,
  formEditAvatarLink,
  validationConfig,
  buttonTextSubmit,
} from "../components/constants";
import { enableValidation, clearValidation } from "../validation/validation";
import {
  customFetch,
  getCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  sendNewCard,
  deleteCard,
  checkUrl,
} from "./api.js";

let userId = "";

//Фнкция отрисовки карточек на странице
const addCardsOnPage = (cardsData, userId) => {
  cardsData.forEach((cardData) => {
    placesList.append(
      createCard(
        cardData,
        deleteCard,
        toggleLikeCard,
        handleOpenPopupCard,
        userId
      )
    );
  });
};

//Функция обновления информации пользователя
const setUserInfo = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
};

// Запрос и отрисовка карточек и информации о пользователе
const getCardsAndUserInfo = () => {
  Promise.all([getCards(), getUserInfo()])
    .then((result) => {
      userId = result[1]._id;
      addCardsOnPage(result[0], result[1]._id);
      setUserInfo(result[1]);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
};

getCardsAndUserInfo();

//Cлушатели для попапов редактирования профиля и добавления новой карточки
buttonAddNewCard.addEventListener("click", handlePopupAddNewCardOpen);
formAddNewCard.addEventListener("submit", handleAddCardFormSubmit);
buttonEditProfile.addEventListener("click", handlePopupEditProfileOpen);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
profileAvatar.addEventListener("click", handlePopupEditAvatarOpen);
formEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);

//Обработчик клика открытия попапа для редактирования профиля
function handlePopupEditProfileOpen() {
  popupProfileName.value = profileTitle.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEditProfile);
}

//Обработчик события submit редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeButtonSubmit(formEditProfile, buttonTextSubmit.loading);
  updateUserInfo(popupProfileName.value, popupProfileDescription.value)
    .then((result) => getUserInfo())
    .then((result) => {
      setUserInfo(result);
      closePopup(popupEditProfile);
      changeButtonSubmit(formEditProfile, buttonTextSubmit.default);
    })
    .catch((err) => {
      console.log(err);
      changeButtonSubmit(formEditProfile, buttonTextSubmit.error);
    });
};

//Обработчик клика открытия попапа для редактирования аватарки
function handlePopupEditAvatarOpen() {
  clearValidation(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
};

//Обработчик события submit редактирования аватарки
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeButtonSubmit(formEditAvatar, buttonTextSubmit.loading);
  updateUserAvatar(formEditAvatarLink.value)
    .then((result) => {
      setUserInfo(result);
      formEditAvatar.reset();
      closePopup(popupEditAvatar);
      changeButtonSubmit(formEditAvatar, buttonTextSubmit.default);
    })
    .catch((err) => {
      changeButtonSubmit(formEditAvatar, buttonTextSubmit.error);
      console.log(err);
    });
}

//Обработчик клика открытия попапа для добавления новой карточки
function handlePopupAddNewCardOpen() {
  clearValidation(popupAddNewCard, validationConfig);
  openPopup(popupAddNewCard);
};

//Обработчик события submit добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: formAddNewCardName.value,
    link: formAddNewCardLink.value,
    owner: {
      _id: userId,
    },
  };
  changeButtonSubmit(formAddNewCard, buttonTextSubmit.loading);
  sendNewCard(cardData)
    .then((result) => {
      placesList.prepend(
        createCard(
          result,
          deleteCard,
          toggleLikeCard,
          handleOpenPopupCard,
          userId
        )
      );
      formAddNewCard.reset();
      closePopup(popupAddNewCard);
      changeButtonSubmit(formAddNewCard, buttonTextSubmit.default);
    })
    .catch((err) => {
      changeButtonSubmit(formAddNewCard, buttonTextSubmit.error);
      console.log(err);
    });
};

//Валидация форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

//Функция ожидания результата запроса
function changeButtonSubmit(form, text) {
  const buttonSubmit = form.querySelector(".popup__button");
  buttonSubmit.textContent = text;
};
