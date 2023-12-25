import "../pages/index.css";
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
  profileAvatar,
  popupProfileName,
  popupProfileDescription,
  validationConfig
} from "../components/constants";
import { enableValidation, clearValidation } from "../validation/validation";
import { customFetch, getCards, getUserInfo, updateUserInfo, sendNewCard} from './api.js';


//Фнкция отрисовки карточек на странице
const addCardsOnPage = (cardsData, userId) => {
  cardsData.forEach((cardData) => {
    placesList.append(
      createCard(cardData, deleteCard, toggleLikeCard, handleOpenPopupCard)
    );
  });
};

//Функция обновления информации пользователя
const setUserInfo = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

// Запрос и отрисовка карточек и информации о пользователе
const getCardsAndUserInfo = () => {
  Promise.all([
    getCards(),
    getUserInfo()
  ])
  .then(result => {
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
  updateUserInfo(popupProfileName.value, popupProfileDescription.value)
  .then(result => getUserInfo())
  .then(result => {
    setUserInfo(result);
    closePopup(popupEditProfile);
  })
  .catch((err) => {console.log(err)});
}

//Обработчик клика открытия попапа для добавления новой карточки
function handlePopupAddNewCardOpen() {
  clearValidation(popupAddNewCard,validationConfig);
  openPopup(popupAddNewCard);
}

//Обработчик события submit добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: formAddNewCardName.value,
    link: formAddNewCardLink.value,
  };
  
  sendNewCard(cardData)
  .then(result => {
    console.log(result)
    placesList.prepend(
      createCard(result, deleteCard, toggleLikeCard, handleOpenPopupCard)
    );
    formAddNewCard.reset();
    closePopup(popupAddNewCard);
  })
  .catch((err) => {console.log(err)}); 
}

//Валидация форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
