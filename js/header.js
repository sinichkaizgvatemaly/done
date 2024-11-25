// Получаем элемент header
const header = document.getElementById('header');

// Функция, которая добавляет или удаляет класс в зависимости от прокрутки
function toggleHeaderBackground() {
  if (window.scrollY > 0) {
    header.classList.add('scrolled'); // Добавляем класс, если прокручено больше 0px
  } else {
    header.classList.remove('scrolled'); // Убираем класс, если вверху страницы
  }
}

// Слушаем событие прокрутки
window.addEventListener('scroll', toggleHeaderBackground);
