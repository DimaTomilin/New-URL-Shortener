import { showingAlert, showingAlert2 } from './alerts';
import { setFormMessage } from './login';

document.getElementById('to-main').addEventListener('click', toMainPage);

export function toMainPage() {
  document.getElementById('shortener').style.display = 'block';
  document.getElementById('url-input').value = '';
  document.getElementById('short-url').value = '';
  document.getElementById('url-statistic').style.display = 'none';
}

const closeButtons = document.getElementsByClassName('closebtn');

for (const button of closeButtons) {
  button.onclick = function () {
    const div = this.parentElement;
    div.style.opacity = '0';
    setTimeout(function () {
      div.style.display = 'none';
    }, 600);
  };
}

document.getElementById('execCopy').addEventListener('click', copyFunction);

function copyFunction() {
  document.getElementById('short-url').select();
  document.execCommand('copy');
}

//Check if URL is correct(don`t check if URL is exist)
export function validateURL(url) {
  try {
    const validatedURL = new URL(url);
    if (
      validatedURL.protocol === 'http:' ||
      validatedURL.protocol === 'https:'
    ) {
      return validatedURL;
    } else {
      showingAlert2('Unknown protocol. Please try again.');
      throw err;
    }
  } catch (err) {
    showingAlert2('Invalid URL please try again.');
    throw err;
  }
}

//Check if one of fields is empty and minimum length
export function validationInputs(element) {
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

//Check validation of password in creating process
export function checkConfirmPassword(element) {
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

//Clear all inputs in document
export function clearInputs() {
  document.querySelectorAll('.form__input').forEach((input) => {
    input.value = '';
  });
}

//Clear all error messages in element
export function cleanFormMessage(formElement) {
  const messageElement = formElement.querySelector('.form__message');
  messageElement.textContent = '';
}

//Function that used in log out, shows to user Login form
export function showingSignIn() {
  document.querySelector('#login').classList.remove('form--hidden');
  document.getElementById('url-shortener').classList.add('form--hidden');
  document.getElementById('root').classList.add('container');
  document.querySelector('body').classList.add('sign__in');
}

//User loged in, shows main webpage to user(save autorization token in cookies)
export function showURLShortener(response) {
  const loginForm = document.querySelector('#login');
  clearInputs();
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
