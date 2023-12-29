//функция показать ошибку валидации
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

//функция спрятать ошибку валидации и делает кнопку неактивной
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

//Функция проверки валидации по свойству validity
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage
    );
  } else if (
    !inputElement.validity.patternMismatch &&
    !inputElement.validity.valid
  ) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Функция проверки хотя бы одного невалидного поля в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция переключения активности кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
};

//Функция валидации форм
const enableValidation = (formData) => {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(formData.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      formData.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

//Функция очищения полей валидации формы
const clearValidation = (form, formData) => {
  const inputList = Array.from(form.querySelectorAll(formData.inputSelector));
  const buttonElement = form.querySelector(formData.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

export { enableValidation, clearValidation };
