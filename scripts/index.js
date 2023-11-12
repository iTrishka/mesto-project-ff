// DOM узлы
const cardsListElement = document.querySelector('.places__list');
const addCardsButtom = document.querySelector('.profile__add-button');

// Функция создания карточки
const createCard = (cardData, deleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardData.title;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = cardData.title;

  const deleteCardButtom = newCard.querySelector('.card__delete-button');
  deleteCardButtom.addEventListener( 'click', e => deleteCard(e));

  return newCard;
};

// Функция удаления карточки
const deleteCard = e => {
  const cardForDelete = e.target.closest('.card');
  cardForDelete.remove();
};

// Вывести карточки на страницу
const addCards = cardsDataList => {
  cardsDataList.forEach(cardData => {
    cardsListElement.append(createCard(cardData, deleteCard));
  });
};

addCards(initialCards);
