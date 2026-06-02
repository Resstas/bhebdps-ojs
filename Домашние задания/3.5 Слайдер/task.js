document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slider__item'));
  const prevButton = document.querySelector('.slider__arrow_prev');
  const nextButton = document.querySelector('.slider__arrow_next');
  const dots = Array.from(document.querySelectorAll('.slider__dot'));
  
  let currentIndex = 0;
  
  function updateSlider() {
    // Обновляем слайды
    slides.forEach((slide, index) => {
      slide.classList.toggle('slider__item_active', index === currentIndex);
    });
    
    // Обновляем точки (если они есть)
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.classList.toggle('slider__dot_active', index === currentIndex);
      });
    }
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }
  
  // Обработчики для кнопок
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  
  // Обработчики для точек
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });
  }
});