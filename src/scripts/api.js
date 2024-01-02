const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "a040f8ad-2e23-4247-b284-1555f9f98cf2",
    "Content-Type": "application/json",
  },
};

//Функция проверки ответа
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Функция запроса
export const customFetch = (endpoint, method = "GET", body = {}) => {
  if (
    method === "GET" ||
    method === "DELETE" ||
    method === "PUT" ||
    method === "HEAD"
  ) {
    return fetch(`${config.baseUrl}/${endpoint}`, {
      method: method,
      headers: config.headers,
    })
      .then((result) => checkResponse(result))
      .catch((err) => {
        console.log(err);
      });
  } else if (method === "POST" || method === "PATCH") {
    return fetch(`${config.baseUrl}/${endpoint}`, {
      method: method,
      headers: config.headers,
      body: JSON.stringify(body),
    }).then((result) => checkResponse(result));
  }
};

//Запрос карточек(GET)
export const getCards = () => customFetch("cards");

//Запрос информации о пользователе(GET)
export const getUserInfo = () => customFetch("users/me");

//Запрос на редактирование профиля(PATCH)
export const updateUserInfo = (name, description) =>
  customFetch("users/me", "PATCH", {
    name: name,
    about: description,
  });

//Запрос на добавления новой карточки(POST)
export const sendNewCard = (card) =>
  customFetch("cards", "POST", {
    name: card.name,
    link: card.link,
  });

//Запрос на обновление аватарки(PATCH)
export const updateUserAvatar = (url) =>
  customFetch("users/me/avatar", "PATCH", {
    avatar: url,
  });

//Запрос на удаление карточки (DELETE)
export const deleteCard = (id) => customFetch(`cards/${id}`, "DELETE");

//Запрос на добавление лайка карточки(PUT)
export const addLikeCard = (id) => customFetch(`cards/likes/${id}`, "PUT");

//Запрос на удаление лайка карточки (DELETE)
export const removeLikeCard = (id) =>
  customFetch(`cards/likes/${id}`, "DELETE");
