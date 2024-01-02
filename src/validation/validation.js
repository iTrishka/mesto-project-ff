//функция показать ошибку валидации
const showInputError = (
  validationConfig,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//функция спрятать ошибку валидации и делает кнопку неактивной
const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

//Функция проверки валидации по свойству validity
const checkInputValidity = (validationConfig, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      validationConfig,
      formElement,
      inputElement,
      inputElement.dataset.errorMessage
    );
  } else if (
    !inputElement.validity.patternMismatch &&
    !inputElement.validity.valid
  ) {
    console.log("enter2");
    showInputError(
      validationConfig,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};

//Функция проверки хотя бы одного невалидного поля в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция переключения активности кнопки
const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Функция валидации форм
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(validationConfig, formElement, inputElement);
        toggleButtonState(validationConfig, inputList, buttonElement);
      });
    });
  });
};

//Функция очищения полей валидации формы
const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, form, inputElement);
  });
  toggleButtonState(validationConfig, inputList, buttonElement);
};

export { enableValidation, clearValidation };
