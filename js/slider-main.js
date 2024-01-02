const sliderCards = document.querySelectorAll('.favorite__slider__card');
const sliderImages = document.querySelectorAll('.favorite__slider__card__img ');
const sliderLine = document.querySelector('.favorite__slider__line');
const prevArrow = document.querySelector('#prev-arrow');
const nextArrow = document.querySelector('#next-arrow');
const innerBars = document.querySelectorAll('.favorite__progress-inner');


let sliderCount = 0;
let sliderWidth;

window.addEventListener('resize', resizeSlide);

nextArrow.addEventListener('click', nextSlide);
prevArrow.addEventListener('click', prevSlide);


function resizeSlide() {
    sliderWidth = document.querySelector('.favorite__slider__container').offsetWidth;
  
    sliderLine.style.width = Math.round(sliderWidth * sliderCards.length) + 'px';
    sliderCards.forEach(item => item.style.width = sliderWidth + 'px');
    sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

     moveSlides();
}

resizeSlide();

function nextSlide() {
    sliderCount++;
    if (sliderCount >= sliderCards.length) sliderCount = 0;

    moveSlides();
    thisSlide(sliderCount);
}

function prevSlide() {
    sliderCount--;
    if (sliderCount < 0) sliderCount = sliderCards.length - 1;

    moveSlides();
     thisSlide(sliderCount);
} 

function moveSlides() {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
  
}

function thisSlide(index) {
    innerBars.forEach(item => item.classList.remove('progress__active'));
    innerBars[index].classList.add('progress__active')
}

// ! autoslider

const autoSlide = setInterval(() => {
  nextSlide()
}, 7000)

// ?touch on the tablet and mobile

let start;
let change;

const slideShow = () => {
  if (change > 0) {
    prevSlide();
  } else {
    nextSlide();
  }
};



sliderLine.addEventListener('touchtart', (event) => {
  start = event.touches[0].clientX;
});

sliderLine.addEventListener('touchmove', (event) => {
  event.preventDefault();
  let touch = event.touches[0];
    change = start - touch.clientX;
    start = 0;
});

sliderLine.addEventListener('touchend', slideShow);

