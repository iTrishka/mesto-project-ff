// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
const createCard = (cardData, handleDeleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

  cardNew.querySelector('.card__title').textContent = cardData.name;
  cardNew.querySelector('.card__image').src = cardData.link;
  cardNew.querySelector('.card__image').alt = cardData.name;

  const buttonBasketDeleteCard = cardNew.querySelector('.card__delete-button');
  buttonBasketDeleteCard.addEventListener( 'click', handleDeleteCard);

  return cardNew;
};

// Функция удаления карточки
const handleDeleteCard = e => {
  const cardForDelete = e.target.closest('.card');
  cardForDelete.remove();
};

// Вывести карточки на страницу
const addCardsOnPage = cardsData => {
  cardsData.forEach(cardData => {
    placesList.append(createCard(cardData, handleDeleteCard));
  });
};

addCardsOnPage(initialCards);
