import { slider } from './modules/slider.js';
import { createInfoHtml, createPlanetsHtml, createErrorHtml } from './modules/createHtml.js';

const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/solaris-api/';
const planetsContainerElem = document.querySelector('.planets__container');
const planetInfoWrapperElem = document.querySelector('.planetsinfo__wrapper');

let planetsList = [];

async function getKey() {
  const response = await fetch(`${BASE_URL}/keys`);
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

  if (response.status !== 200) {
    createErrorHtml(response.status);
  } else {
    planetsList = data;
    createPlanetsHtml(data, planetsContainerElem);
    createInfoHtml(data);
  }
}

getPlanets();

planetsContainerElem.addEventListener('click', (event) => {
  let clickedPlanetId = event.target.dataset.id;
  if (clickedPlanetId === undefined) return;
  else displaySlider(clickedPlanetId, planetsList);
});

planetInfoWrapperElem.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn__close')) showAndHide();
});

function displaySlider(clickedPlanetId) {
  slider(clickedPlanetId);
  showAndHide();
}

function showAndHide() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.toggle('hide');
}
