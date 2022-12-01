// I den här modulen finns de funktioner som skapar Html elementen.
export { createInfoHtml, createPlanetsHtml };

function createPlanetsHtml(planets, planetsContainer) {
  for (let i = 0; i < planets.bodies.length; i++) {
    const planetHtml = `<article class="planet planets__${planets.bodies[
      i
    ].name.toLowerCase()}" data-id="${planets.bodies[i].id}"></article>`;
    planetsContainer.insertAdjacentHTML('beforeend', planetHtml);
  }
}

function createInfoHtml(planets) {
  const planetInfoWrapperElem = document.querySelector('.planetsinfo__wrapper');
  for (let i = 0; i < planets.bodies.length; i++) {
    const planetsMoons = planets.bodies[i].moons;

    const planetInfoHtml = `<article class="info__container" data-id="${planets.bodies[i].id}">
    <section class="info__main">
    <header class="info__header">
    <h1 class="info__tile">${planets.bodies[i].name}</h1>
    <button class='btn__close'>&times;</button>;
    </header>
    <h3 class="info__subtitle">${planets.bodies[i].latinName}</h3>
    <p class="info__desc">${planets.bodies[i].desc}</p>
    </section>
    <section class="info__secondary">
    <aside class="secondary__left">
    <h4 class="secondary__title title-circum">Omkrets</h4><p class="secondary__info info-circum">${planets.bodies[i].circumference} km</p>
    <h4 class="secondary__title title-distance">Km från solen</h4><p class="secondary__info info-distance">${planets.bodies[i].distance} km</p>
    </aside>
    <aside class="secondary__right">
    <h4 class="secondary__title title-maxtemp">Max temperatur</h4><p class="secondary__info info-maxtemp">${planets.bodies[i].temp.day}C</p>
    <h4 class="secondary__title title-mintemp">Min temperatur</h4><p class="secondary__info info-mintemp">${planets.bodies[i].temp.night}C</p>
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
