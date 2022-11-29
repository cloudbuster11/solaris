import { slider } from './modules/slider.js';
import { createInfoHtml, createPlanetsHtml } from './modules/createHtml.js';

const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
const planetsContainer = document.querySelector('.planets__container');
const btnClose = document.querySelector('.btn__close');
let planetsList = [];

async function getKey() {
  const response = await fetch(`${BASE_URL}/keys`, {
    method: 'POST',
  });
  const data = await response.json();
  return data.key;
}

async function getPlanets() {
  const key = await getKey();
  const response = await fetch(`${BASE_URL}/bodies`, {
    headers: {
      'x-zocom': key,
    },
  });
  let data = await response.json();
  planetsList = data;
  createPlanetsHtml(data, planetsContainer);
  createInfoHtml(data);
}

getPlanets();

planetsContainer.addEventListener('click', (event) => {
  let clickedPlanetId = event.target.dataset.id;
  if (clickedPlanetId === undefined) return;
  else displayPlanetInfo(clickedPlanetId, planetsList);
});

btnClose.addEventListener('click', showAndHide);

function displayPlanetInfo(clickedPlanetId) {
  slider(clickedPlanetId);
  showAndHide();
}

function showAndHide() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.toggle('hide');
}
