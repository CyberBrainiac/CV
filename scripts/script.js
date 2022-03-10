let page = document.querySelector('.page');
let paragraph = document.querySelector('p');
page.classList.add('dark-theme');
let themeButton = document.querySelector('.theme-button');
let myHead = document.querySelector('h1');
themeButton.onclick = function () {
  page.classList.toggle('dark-theme');
  page.classList.toggle('light-theme');
//  myHead.textContent = 'CHEBUREK';
  console.log("Кнопка нажата");
}
//promt диалог с вводом
//alert оповещение
