import { statisticSection } from './shortens';

//Generit function to crating new DOM elements
function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  let el = document.createElement(tagName);
  //Adding children
  for (const child of children) {
    el.append(child);
  }
  //Adding classes
  for (const cls of classes) {
    el.classList.add(cls);
  }
  //Adding attributes
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }
  //Adding events
  for (const event in eventListeners) {
    el.addEventListener(event, eventListeners[event]);
  }
  return el;
}

//Creating new statistic page from shorten object
export function urlStatistic(obj) {
  const header = createElement('h3');
  header.innerHTML = 'Statistic of URL Shorten';
  const shortURL = createElement('div', [], ['statistic-div']);
  shortURL.innerHTML = `<p>Short URL: <a href='${obj.short_URL}' target='_blank'> ${obj.short_URL} <a></p>`;
  const longURL = createElement('div', [], ['statistic-div']);
  longURL.innerHTML = `<p>Long URL: <a href='${obj.original_URL}' target='_blank'> ${obj.original_URL} <a></p>`;
  const counter = createElement('div', [], ['statistic-div']);
  counter.innerHTML = `Counter: ${obj.counter}`;
  const creatingtime = createElement('div', [], ['statistic-div']);
  creatingtime.innerHTML = `Was created: ${obj.createdAt}`;
  document
    .getElementById('statistic')
    .append(header, shortURL, longURL, counter, creatingtime);
}

//Creating list of user`s shorts urls
export function generateList(listOfShortens) {
  document.getElementById('statistic').innerHTML = '';
  for (const shorten of listOfShortens) {
    const shortPart = createElement(
      'div',
      [`${shorten.short_URL}`],
      ['short-url'],
      {},
      { click: statisticSection }
    );

    const longPart = createElement('a', [], ['long-url'], {}, {});
    longPart.innerHTML = `${shorten.original_URL}`;
    longPart.href = shorten.original_URL;
    longPart.target = '_blank';
    const shortenElement = createElement(
      'div',
      [shortPart, longPart],
      ['users-url']
    );

    document.getElementById('statistic').append(shortenElement);
  }
}
