import axios from 'axios';
import {
  validationInputs,
  checkConfirmPassword,
  clearInputs,
  showURLShortener,
  cleanFormMessage,
} from './directives';

//Function that added error message to Sign In and Sign Up pages
export function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector('.form__message');

  messageElement.textContent = message;
  messageElement.classList.remove(
    'form__message--success',
    'form__message--error'
  );
  messageElement.classList.add(`form__message--${type}`);
}

//Send request to Sign In
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

//Send request to Sign Up
async function signUpRequest(username, password) {
  try {
    const response = await axios.put('http://localhost:3030/user/create', {
      username,
      password,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

//Add all needed functionality bu loading page
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login');
  const createAccountForm = document.querySelector('#createAccount');

  //Switch to Create Account Form
  document
    .querySelector('#linkCreateAccount')
    .addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('form--hidden');
      createAccountForm.classList.remove('form--hidden');
      clearInputs();
      cleanFormMessage(loginForm);
    });

  //Switch to Login Form
  document.querySelector('#linkLogin').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('form--hidden');
    createAccountForm.classList.add('form--hidden');
    clearInputs();
    cleanFormMessage(createAccountForm);
  });

  //Behavior after submit in login form
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('.username').value;
    const password = loginForm.querySelector('.password').value;
    if (validationInputs(loginForm)) {
      try {
        const response = await signInRequest(username, password);
        cleanFormMessage(loginForm);
        showURLShortener(response);
      } catch (err) {
        setFormMessage(loginForm, 'error', err.response.data);
      }
    }
  });

  //Behavior after submit in create account form
  createAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = createAccountForm.querySelector('.username').value;
    const password = createAccountForm.querySelector('.password').value;
    if (
      validationInputs(createAccountForm) &&
      checkConfirmPassword(createAccountForm)
    ) {
      try {
        const response = await signUpRequest(username, password);
        clearInputs();
        setFormMessage(
          createAccountForm,
          'success',
          'Succesful registration. Please make sign in.'
        );
        setTimeout(() => {
          loginForm.classList.remove('form--hidden');
          createAccountForm.classList.add('form--hidden');
          cleanFormMessage(createAccountForm);
        }, 1200);
      } catch (err) {
        setFormMessage(createAccountForm, 'error', err.response.data);
      }
    }
  });
});
