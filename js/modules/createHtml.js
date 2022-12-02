// I den här modulen finns de funktioner som skapar Html elementen.
export { createInfoHtml, createPlanetsHtml, createErrorHtml };

function createPlanetsHtml(planets, planetsContainer) {
  for (let i = 0; i < planets.length; i++) {
    const planetHtml = `<article class="planet planets__${planets[
      i
    ].name.toLowerCase()}" data-id="${planets[i].id}"></article>`;
    planetsContainer.insertAdjacentHTML('beforeend', planetHtml);
  }
}

function createInfoHtml(planets) {
  const planetInfoWrapperElem = document.querySelector('.planetsinfo__wrapper');
  for (let i = 0; i < planets.length; i++) {
    const planetsMoons = planets[i].moons;

    const planetInfoHtml = `<article class="info__container" data-id="${planets[i].id}">
    <section class="info__main">
    <header class="info__header">
    <h1 class="info__tile">${planets[i].name}</h1>
    <button class='btn__close'>&times;</button>;
    </header>
    <h3 class="info__subtitle">${planets[i].latinName}</h3>
    <p class="info__desc">${planets[i].desc}</p>
    </section>
    <section class="info__secondary">
    <aside class="secondary__left">
    <h4 class="secondary__title title-circum">Omkrets</h4><p class="secondary__info info-circum">${planets[i].circumference} km</p>
    <h4 class="secondary__title title-distance">Km från solen</h4><p class="secondary__info info-distance">${planets[i].distance} km</p>
    </aside>
    <aside class="secondary__right">
    <h4 class="secondary__title title-maxtemp">Max temperatur</h4><p class="secondary__info info-maxtemp">${planets[i].temp.day}C</p>
    <h4 class="secondary__title title-mintemp">Min temperatur</h4><p class="secondary__info info-mintemp">${planets[i].temp.night}C</p>
    </aside>
    </section>
    <section class="info__moons">
    <h4 class="secondary__title title-moon">Månar</h4><ul id="${i}"></ul>
    </section>
    </article>`;

    planetInfoWrapperElem.insertAdjacentHTML('beforeend', planetInfoHtml);

    const moonListElem = document.getElementById(`${[i]}`);

    for (let i = 0; i < planetsMoons.length; i++) {
      if (planetsMoons.length === 0) return;
      else {
        const moonElem = `<li>${planetsMoons[i]}</li>`;
        moonListElem.insertAdjacentHTML('beforeend', moonElem);
      }
    }
  }
}

function createErrorHtml(error) {
  const pageWrapper = document.querySelector('.wrapper');
  const errorHtml = `<article class="error__container"><h3 class="error__title">Error</h3>
  <p class="error__message">${error}</p></article>`;

  pageWrapper.insertAdjacentHTML('afterbegin', errorHtml);
}
