import axios from 'axios';
import { showingAlert } from './alerts';

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
      return false;
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
    return false;
  }
  return true;
}

function checkConfirmPassword(element) {
  let password;
  const passwordFields = element
    .querySelectorAll('.password')
    .forEach((passwordField) => {
      if (!password) {
        password = passwordField.value;
      } else {
        if (password !== passwordField.value) {
          setFormMessage(element, 'error', 'Password doesn`t match');
          return false;
        }
      }
    });
  return true;
}

async function signInRequest(username, password) {
  try {
    const response = await axios.post('http://localhost:3030/user/signin', {
      username,
      password,
    });
    return response;
  } catch (err) {
    throw err;
  }
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

function clearInputs(element) {
  element.querySelectorAll('.form__input').forEach((input) => {
    input.value = '';
  });
}

function showURLShortener(response) {
  const loginForm = document.querySelector('#login');
  clearInputs(loginForm);
  loginForm.classList.add('form--hidden');
  document.getElementById('url-shortener').classList.remove('form--hidden');
  document.getElementById('root').classList.remove('container');
  document.querySelector('body').classList.remove('sign__in');
  showingAlert(
    document.getElementById('alert1'),
    response.status,
    response.data
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login');
  const createAccountForm = document.querySelector('#createAccount');
  const urlShortener = document.getElementById('url-shortener');

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

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('.username').value;
    const password = loginForm.querySelector('.password').value;
    if (validationInputs(loginForm)) {
      try {
        const response = await signInRequest(username, password);
        showURLShortener(response);
      } catch (err) {
        setFormMessage(loginForm, 'error', err.response.data);
      }
    }

    // Perform your AJAX/Fetch login

    //setFormMessage(loginForm, 'error', 'Invalid username/password combination');
  });

  createAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('1');
    validationInputs(createAccountForm);
    checkConfirmPassword(createAccountForm);

    // Perform your AJAX/Fetch login

    //setFormMessage(loginForm, 'error', 'Invalid username/password combination');
  });

  document.querySelectorAll('.form__input').forEach((inputElement) => {
    inputElement.addEventListener('input', (e) => {
      clearInputError(inputElement);
    });
  });
});
