import { data } from './data.js';

const menu = document.querySelector(".menu__list");
const overlay = document.querySelector(".modal__overlay");
const modalCloseBtn = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.modal');

let product = null;
let products = data;
console.log(products);

menu.addEventListener("click", openCardhandler);
overlay.addEventListener("click", closeCardHandler);
// modalCloseBtn.addEventListener('click', () => {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// })

function openCardhandler(e) {
  if (!e.target.closest("li")) {
    return;
  }
  // ? ???
  const id = e.target.closest("li").dataset.id;
  
  toggleCardHandler();
  product = getProductById(id);
  const markup = createMarkup(product);
  overlay.innerHTML = markup;
  const size = document.querySelector(".product__size");
  const s = size.children[1].children[0];
  s.classList.add("modal__size-item_active");
  const modalCloseBtn = document.querySelector(".modal__close-btn");
  modalCloseBtn.addEventListener("click", toggleCardHandler);
  size.children[1].addEventListener("click", changeSizeHandler);
  const additives = document.querySelector(".additives__choice");
  additives.children[1].addEventListener("click", changeAdditivesHandler);
  
}

function toggleCardHandler() {
  document.body.classList.toggle("no-scroll");
  overlay.classList.toggle("overlay__hidden");
}

function closeCardHandler(e) {
  if (e.currentTarget === e.target) {
    toggleCardHandler();
  }
}

function changeSizeHandler(e) {
  if (!e.target.closest("li")) {
    return;
  }

  const prevSize = document.querySelector(".modal__size-item_active");
  prevSize.classList.remove("modal__size-item_active");

  const nextSize = e.target.closest("li");
  nextSize.classList.add("modal__size-item_active");

  const key = nextSize.children[0].textContent;
  const price = product.price;
  const add = product.sizes[key]["add-price"];
  let result = (Number(price) + Number(add)).toFixed(2);

  const additives = Array.from(
    document.querySelectorAll(".modal__additives-item_active")
  );

  additives.forEach((additive) => {
    const label = additive.children[1].textContent;

    product.additives.forEach((item) => {
      const [name, value] = Object.values(item);
      if (name === label) {
        result = (Number(result) + Number(value)).toFixed(2);
      }
    });
  });

  const total = document.querySelector(".modal__price");
  total.textContent = `$${result}`;
}



function changeAdditivesHandler(e) {
  if (!e.target.closest("li")) {
    return;
  }
  const nextAdditive = e.target.closest("li");
  nextAdditive.classList.toggle("modal__additives-item_active");

 

  const size = document.querySelector(".modal__size-item_active");
  const key = size.children[0].textContent;
  const price = product.price;
  const add = product.sizes[key]["add-price"];
  let result = (Number(price) + Number(add)).toFixed(2);

  const additives = Array.from(
    document.querySelectorAll(".modal__additives-item_active")
  );
  additives.forEach((additive) => {
    const label = additive.children[1].textContent;

    product.additives.forEach((item) => {
      const [name, value] = Object.values(item);
      if (name === label) {
        result = (Number(result) + Number(value)).toFixed(2);
      }
    });
  });

  const total = document.querySelector(".modal__price");
  total.textContent = `$${result}`;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}


function createMarkup(product) {
  const { name, description, price, image, sizes, additives } = product;
  return `<div class="modal">

        <div class="modal__img">
          <img src="./images/img-menu/${image}" alt="${name}">
        </div>

        <div class="product__container">

          <div class="modal__info">
            <h3 class="product__name">${name}</h3>
            <p class="product__description">${description}</p>
          </div>

          
          <div class="product__size">
            <p class="modal__product__size">Size</p>
                    
            <ul class="modal__product--options">
              ${Object.entries(sizes)
                .map(
                  ([key, value]) =>
                    `<li class="modal__size-item">
                       <div class="modal__size-item__size">${key}</div>
                       <div class="option__volume">${value.size}</div>
                     </li>`
                )
                .join("")}
            </ul>
          </div>

         
          <div class="additives__choice">
          <p class="modal__product__size">Additives</p>
            <ul  class="modal__product--options">
            ${additives
              .map(
                (additive, index) =>
                  `<li class="modal__size-item">
                    <div class="modal__size-item__size">${index + 1}</div>
                    <div class="option__volume">${additive.name}</div>
                  </li>`
              )
              .join("")}
            </ul>            
          </div>

          <div class="modal__total">
            <h3>Total:<h3>
            <h3 class="modal__price">$${price}</h3>
          </div>
          
          
          <div class="modal__alert">
              <div class="modal__product__alert__img">
                <img src="./images/icons/info-empty.svg" alt="info icon">
              </div>
             <p class="modal__product__alert__text">
                The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
              </p>
          </div>
         

          <div class="modal__close-btn">Close</div>

        </div>

      </div>`;
}
