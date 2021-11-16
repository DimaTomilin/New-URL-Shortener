import { showingAlert2 } from './alerts';
import { generateList, urlStatistic } from './elements';
import { validateURL } from './directives';
import axios from 'axios';

document.getElementById('post-button').addEventListener('click', createShorten);
document.getElementById('see-all').addEventListener('click', allMyShortens);

async function createShorten() {
  try {
    const longURL = validateURL(
      document.getElementById('url-input').value
    ).href;
    const response = await axios.put(`http://localhost:3030/url/create`, {
      url: longURL,
    });
    document.getElementById('short-url').value = response.data.short_URL;
  } catch (err) {
    showingAlert2(err.response.data);
  }
}

async function allMyShortens() {
  try {
    const response = await axios.get(`http://localhost:3030/user/all`);
    const allURLs = response.data;
    document.getElementById('shortener').style.display = 'none';
    document.getElementById('url-statistic').style.display = 'block';
    generateList(allURLs);
  } catch (err) {
    showingAlert2(err.response.data);
  }
}

export async function statisticSection(e) {
  const shortURL = e.target.innerHTML;
  const index = shortURL.lastIndexOf('/') + 1;
  console.log(shortURL.slice(index));
  const response = await axios.get(
    `http://localhost:3030/url/statistic?url=${shortURL.slice(index)}`
  );
  console.log(response);
  document.getElementById('statistic').innerHTML = '';
  urlStatistic(response.data);
}
