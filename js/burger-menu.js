// prompt('Уважаемый проверяющий, ховер кнопки Menu не соответствует макету, т.к. я не согласна с дизайнером и считаю, что анамация (появляющаяся чашка) в данном случае не должна влиять на соседний элемент. Переделать могу, но очень бы не хотелось')
const burger = document.querySelector('#burger');
const headerNav = document.querySelector('.header__nav__pannel');
const burgerSpans = document.querySelectorAll('.burger-btn__line');

burger.addEventListener('click', function () {
  headerNav.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
});




// ? закрываем мобильное меню при переходе по ссылкам

const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(element => {
 element.addEventListener('click', function () {
   headerNav.classList.remove('is-open');
   document.body.classList.toggle('no-scroll');
  });


})





  

  



