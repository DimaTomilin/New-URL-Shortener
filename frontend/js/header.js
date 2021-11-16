import { showingAlert } from './alerts';
import { showingSignIn, toMainPage } from './directives';
import axios from 'axios';

document.getElementById('log-out-button').addEventListener('click', userLogOut);
document.getElementById('check-button').addEventListener('click', checkUser);

//Function of log out from user(Deleting token)
async function userLogOut() {
  const response = await axios.delete('http://localhost:3030/user/logout');
  showingAlert(
    document.getElementById('alert1'),
    response.status,
    response.data
  );
  toMainPage();
  setTimeout(() => {
    showingSignIn();
  }, 1200);
}

//Show user
async function checkUser() {
  const response = await axios.get(`http://localhost:3030/user/info`);
  showingAlert(
    document.getElementById('alert1'),
    response.status,
    response.data
  );
}
