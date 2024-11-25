document.addEventListener("scroll", () => {
	const images = document.querySelectorAll(".image-container-scroll");
	const windowHeight = window.innerHeight;
 
	images.forEach(image => {
	  const rect = image.getBoundingClientRect();
	  if (rect.top < windowHeight && rect.bottom > 0) {
		 // Элемент в зоне видимости
		 image.classList.add("show");
	  } else {
		 // Элемент вне зоны видимости
		 image.classList.remove("show");
	  }
	});
 });
 