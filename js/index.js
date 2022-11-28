const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
const planetsContainer = document.querySelector('.planets__container');
let planetsList = [];

async function getKey() {
  const response = await fetch(`${BASE_URL}/keys`, {
    method: 'POST',
  });
  const data = await response.json();
  console.log(data);

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
  console.log(data);
  renderPlanets(data);
}

getPlanets();

planetsContainer.addEventListener('click', (event) => {
  let clickedPlanetId = event.target.dataset.id;
  displayPlanetInfo(clickedPlanetId, planetsList);
});

function renderPlanets(planets) {
  for (let i = 0; i < planets.bodies.length; i++) {
    // console.log(planets.bodies[i]);
    const planetHtml = `<article class="planet planets__${planets.bodies[
      i
    ].name.toLowerCase()}" data-id="${planets.bodies[i].id}"></article>`;
    planetsContainer.insertAdjacentHTML('beforeend', planetHtml);
  }
}

function displayPlanetInfo(clickedPlanetId, planetsList) {
  console.log(clickedPlanetId);
  console.log(planetsList);
}
