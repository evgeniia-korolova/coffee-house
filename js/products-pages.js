import { data } from './data.js';

const BREAKPOINT = 768;
const DEFAULT_CATEGORY = 'coffee';
const PRODUCTS_PER_PAGE = 4;
const tabs = document.querySelector('.menu__tabs');
const menu = document.querySelector('.menu__list');
const refreshBtn = document.querySelector('.menu__icon-refresh');

let cards = [];

let products = data;


// console.log(data);

initializeMenu();

tabs.addEventListener('click', tabsHandler);
refreshBtn.addEventListener('click', loadMoreHandler);
window.addEventListener('resize', resizeHandler);


function tabsHandler(e) {
  if (!e.target.closest('button')) {
    return;
  }
  menu.innerHTML = '';
  const prevTab = document.querySelector('.tab__active');
  prevTab.classList.remove('tab__active');
    const nextTab = e.target.closest('button');
    // nextTab.classList.remove('tab');
    nextTab.classList.add('tab__active');
   
  const category = nextTab.children[1].textContent.toLowerCase();
  cards = getProducts(category);

  const markup = createMarkup(cards);
  menu.innerHTML = markup;

  resizeHandler();
}

function loadMoreHandler() {
  const items = Array.from(menu.children);
  items.map((item, index) =>
    index >= PRODUCTS_PER_PAGE
      ? item.classList.remove('hidden')
      : item
  );
  refreshBtn.classList.add('refresh__hidden');
}

function resizeHandler() {
    const items = Array.from(menu.children);
    console.log(items);
  if (window.innerWidth > BREAKPOINT) {    
    items.map((item, index) =>
      index >= PRODUCTS_PER_PAGE
        ? item.classList.remove('hidden')
        : item
    );
  } else {
    items.map((item, index) =>
      index >= PRODUCTS_PER_PAGE
        ? item.classList.add('hidden')
        : item
    );
  }
  const hiddenMenu = Array.from(
    document.querySelectorAll('.hidden')
  );
  console.log(hiddenMenu.length);
  if (window.innerWidth > BREAKPOINT || !hiddenMenu.length) {
    
    refreshBtn.classList.add('refresh__hidden');
  } else {
    refreshBtn.classList.remove('refresh__hidden');
  }
  
}

function getProducts(category) {
  return products.filter((product) => product.category === category);
}



function createMarkup(products) {
  return products
    .map(
      ({ id, image, name, description, price }) =>
        `  <li class="card__item" data-id="${id}">
        <article class="menu__card">
              <div class="menu__img__container">
                 <img class="menu__img" src="./images/img-menu/${image}" alt="${name}">
              </div>
              <div class="menu__card__content">
                <h3>${name}</h3>
                <p class="card__text">${description}</p>
                <h3 class="menu__card__price">$${price}</h3>
              </div>
              </article>
            </li>`
    )
    .join('');
}

function initializeMenu() {
  tabs.children[0].classList.add('tab__active');

  cards = getProducts(DEFAULT_CATEGORY);
  const markup = createMarkup(cards);
  menu.innerHTML = markup;
  refreshBtn.classList.remove('refresh__hidden');

  resizeHandler();
}


