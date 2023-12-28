
//Видимые элементы главной страницы
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileAvatar = document.querySelector(".profile__image");
export const buttonAddNewCard = document.querySelector(".profile__add-button");
export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const placesList = document.querySelector(".places__list");

//Шаблон карточки
export const cardTemplate = document.querySelector("#card-template").content;

// //Popup
// export const buttonSubmitPopup = document.querySelector(".popup__button");

//Попап карточки места
export const popupCard = document.querySelector(".popup_type_image");
export const popupCardImage = popupCard.querySelector(".popup__image");
export const popupCardTitle = popupCard.querySelector(".popup__caption");

//Попап добавления новой карточки
export const popupAddNewCard = document.querySelector(".popup_type_new-card");
export const formAddNewCard = document.forms["new-place"];
export const formAddNewCardName = formAddNewCard.elements["place-name"];
export const formAddNewCardLink = formAddNewCard.elements.link;

//Попап редактирования профиля
export const popupEditProfile = document.querySelector(".popup_type_edit");
export const formEditProfile = document.forms["edit-profile"];
export const popupProfileName = formEditProfile.elements.name;
export const popupProfileDescription = formEditProfile.elements.description;

//Попап редактирования профиля
export const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
export const formEditAvatar = document.forms["edit-avatar"];
export const formEditAvatarLink = formEditAvatar.elements.link;

//Конфиг фунгкции очищения полей валидации и деактивации кнопки
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button'
};

//Текст на кнопке
export const buttonTextSubmit = {
  default: "Сохранить",
  loading: "Сохранение...",
  error: "Что-то пошло не так...",
}


