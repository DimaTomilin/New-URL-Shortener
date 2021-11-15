function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector('.form__message');

  messageElement.textContent = message;
  messageElement.classList.remove(
    'form__message--success',
    'form__message--error'
  );
  messageElement.classList.add(`form__message--${type}`);
}

function validationInputs(element) {
  const inputs = element.querySelectorAll('.form__input');
  for (const input of inputs) {
    if (input.value.trim() === '') {
      setFormMessage(element, 'error', 'Invalid username/password combination');
      return;
    }
  }
  const usernameField = element.querySelector('.username');
  const passwordField = element.querySelector('.password');
  if (usernameField.value.length < 8 || passwordField.value.length < 8) {
    setFormMessage(
      element,
      'error',
      'Username/password must be at least 8 characters'
    );
  }
}

function checkConfirmPassword(element) {
  let password;
  const passwordFields = element
    .querySelectorAll('.password')
    .forEach((passwordField) => {
      if (password === '') {
        password = passwordField.value;
      } else {
        if (password !== passwordField.value) {
          setFormMessage(element, 'error', 'Password doesn`t match');
        }
      }
    });
}

function setInputError(inputElement, message) {
  inputElement.classList.add('form__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove('form__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login');
  const createAccountForm = document.querySelector('#createAccount');

  document
    .querySelector('#linkCreateAccount')
    .addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('form--hidden');
      createAccountForm.classList.remove('form--hidden');
    });

  document.querySelector('#linkLogin').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('form--hidden');
    createAccountForm.classList.add('form--hidden');
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validationInputs(loginForm);

    // Perform your AJAX/Fetch login

    //setFormMessage(loginForm, 'error', 'Invalid username/password combination');
  });

  createAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validationInputs(createAccountForm);
    checkConfirmPassword(createAccountForm);

    // Perform your AJAX/Fetch login

    //setFormMessage(loginForm, 'error', 'Invalid username/password combination');
  });

  document.querySelectorAll('.form__input').forEach((inputElement) => {
    inputElement.addEventListener('blur', (e) => {
      if (
        e.target.id === 'signupUsername' &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(
          inputElement,
          'Username must be at least 10 characters in length'
        );
      }
    });

    inputElement.addEventListener('input', (e) => {
      clearInputError(inputElement);
    });
  });
});
