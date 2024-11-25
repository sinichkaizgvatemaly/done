document.addEventListener('DOMContentLoaded', function() {
	// Получаем элементы для модальных окон
	const contactModal = document.getElementById('contact-modal');
	const hoursModal = document.getElementById('hours-modal');
	const aboutModal = document.getElementById('contact-about');
	const contactsLink = document.getElementById('contacts-link');
	const workingHoursLink = document.getElementById('working-hours-link');
	const aboutLink = document.getElementById('open-modal');
	const closeButtons = document.querySelectorAll('.close-button');

	// Проверка на существование элементов перед использованием
	if (!contactModal || !hoursModal || !aboutModal || !contactsLink || !workingHoursLink || !aboutLink) return;

	// Функции для открытия и закрытия модальных окон
	const openModal = (modal) => {
		modal.style.display = 'block';
	};
	const closeModal = (modal) => {
		modal.style.display = 'none';
	};

	// Привязка событий
	contactsLink.onclick = (event) => {
		event.preventDefault();
		openModal(contactModal);
	};
	workingHoursLink.onclick = (event) => {
		event.preventDefault();
		openModal(hoursModal);
	};
	aboutLink.onclick = (event) => {
		event.preventDefault();
		openModal(aboutModal);
	};

	closeButtons.forEach(button => {
		button.onclick = (event) => {
			closeModal(event.target.closest('.modal'));
		};
	});

	window.onclick = (event) => {
		if (event.target === contactModal) closeModal(contactModal);
		if (event.target === hoursModal) closeModal(hoursModal);
		if (event.target === aboutModal) closeModal(aboutModal);
	};

	// Бургер-меню
	const burger = document.getElementById('burger');
	const menuList = document.getElementById('menu-list');
	if (burger && menuList) {
		burger.onclick = () => {
			menuList.classList.toggle('active');
			burger.classList.toggle('active');
		};
	}

	// Прокрутка навигационного меню
	const nav = document.querySelector('.menu');
	if (nav) {
		window.addEventListener('scroll', () => {
			nav.classList.toggle('scrolled', window.scrollY > 50);
		});
	}

	// Плавная прокрутка
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(event) {
			event.preventDefault();
			const targetId = this.getAttribute('href').substring(1);
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop,
					behavior: 'smooth'
				});
			}
		});
	});

	// Прокрутка изображений
	const scrollContainer = document.querySelector('.scroll-content');
	const scrollLeftButton = document.querySelector('.scroll-left');
	const scrollRightButton = document.querySelector('.scroll-right');

	if (scrollContainer && scrollLeftButton && scrollRightButton) {
		const scrollLeft = () => {
			scrollContainer.scrollBy({
				left: -300,
				behavior: 'smooth'
			});
		};

		const scrollRight = () => {
			scrollContainer.scrollBy({
				left: 300,
				behavior: 'smooth'
			});
		};

		scrollLeftButton.onclick = scrollLeft;
		scrollRightButton.onclick = scrollRight;
	}

	// // Обработчик переключения языка
	// let lang = localStorage.getItem('lang') || 'lt'; // Получаем язык из localStorage или по умолчанию 'lt'

	// // Перевод текста
	// function changeLanguage(lang) {
	// 	const elements = document.querySelectorAll('[data-i18n]');
	// 	elements.forEach(el => {
	// 		const key = el.getAttribute('data-i18n');
	// 		if (translations[lang] && translations[lang][key]) {
	// 			el.innerText = translations[lang][key];
	// 		}
	// 	});
	// }

	// // Загрузка перевода при загрузке страницы
	// changeLanguage(lang);

	// // Переключатель языка
	// const languageSelector = document.getElementById('language');
	// if (languageSelector) {
	// 	languageSelector.value = lang;
	// 	languageSelector.addEventListener('change', (e) => {
	// 		const lang = e.target.value;
	// 		localStorage.setItem('lang', lang);
	// 		changeLanguage(lang);
	// 	});
	// }

	// Модальное окно для резервирования
	const myModal = document.getElementById('myModal');
	const closeModalButton = myModal ? myModal.querySelector('.close') : null;
	const reserveButton = document.querySelector('.reserve-table');

	if (myModal && closeModalButton && reserveButton) {
		// Открытие модального окна при нажатии на "Резервировать стейку"
		reserveButton.addEventListener('click', (event) => {
			event.preventDefault(); // Останавливаем переход по ссылке
			myModal.style.display = 'block';
		});

		// Закрытие модального окна
		closeModalButton.addEventListener('click', () => {
			myModal.style.display = 'none';
		});

		// Закрытие модального окна при клике вне его
		window.addEventListener('click', (event) => {
			if (event.target === myModal) {
				myModal.style.display = 'none';
			}
		});
	}

	// Обработка отправки формы
	document.getElementById('orderForm')?.addEventListener('submit', function(event) {
		event.preventDefault();

		const formData = new FormData(this);

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				document.getElementById('responseMessage').textContent = 'Форма успешно отправлена!';
				this.reset(); // очищаем форму

				const successMessage = document.getElementById('successMessage');
				if (successMessage) {
					successMessage.classList.add('show');
					setTimeout(() => {
						successMessage.classList.remove('show');
						myModal.style.display = 'none'; // закрытие модального окна
					}, 2000);
				}
			} else {
				document.getElementById('responseMessage').textContent = 'Ошибка отправки формы.';
			}
		})
		.catch(error => {
			document.getElementById('responseMessage').textContent = 'Произошла ошибка: ' + error.message;
		});
	});

	// Отключаем изменение размера для текстовых полей
	const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
	inputs.forEach(input => {
		input.style.resize = 'none';
	});
});