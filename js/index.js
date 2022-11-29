const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
const planetsContainer = document.querySelector('.planets__container');
const overlay = document.querySelector('.overlay');
const infoWrapper = document.querySelector('.info__wrapper');
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
  renderPlanets(data);
  renderPlanetInfo(data);
}

getPlanets();

planetsContainer.addEventListener('click', (event) => {
  let clickedPlanetId = event.target.dataset.id;
  if (clickedPlanetId === undefined) return;
  else displayPlanetInfo(clickedPlanetId, planetsList);
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

// Ska visa/gå till rätt slider.
function displayPlanetInfo(clickedPlanetId) {
  slider(clickedPlanetId);
  showAndHide();
}

// Skapar all html till planet info i overlay
function renderPlanetInfo(planets) {
  // console.log(planets.bodies[5].moons);
  for (let i = 0; i < planets.bodies.length; i++) {
    const moons = planets.bodies[i].moons;
    const planetInfoHtml = `<article class="info__container" data-id="${planets.bodies[i].id}">
    <section class="info__main">
    <h1 class="info__tile">${planets.bodies[i].name}</h1>
    <h3 class="info__subtitle">${planets.bodies[i].latinName}</h3>
    <p class="info__desc">${planets.bodies[i].desc}</p></section>
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

    infoWrapper.insertAdjacentHTML('beforeend', planetInfoHtml);

    const moonList = document.getElementById(`${[i]}`);

    for (let i = 0; i < moons.length; i++) {
      if (moons.length < 1) {
        return;
      } else {
        const moonElem = `<li>${moons[i]}</li>`;
        moonList.insertAdjacentHTML('beforeend', moonElem);
      }
    }
  }
}

function showAndHide() {
  overlay.classList.toggle('hide');
}

btnClose.addEventListener('click', showAndHide);

// Slider
const slider = function (clickedPlanetId) {
  const slides = document.querySelectorAll('.info__container');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = clickedPlanetId;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    let dotsChildren = dotContainer.firstElementChild;
    while (dotsChildren) {
      dotsChildren.remove();
      dotsChildren = dotContainer.firstElementChild;
    }

    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(curSlide);
    createDots();

    activateDot(curSlide);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
