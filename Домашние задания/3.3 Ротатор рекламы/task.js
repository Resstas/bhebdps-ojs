// Находим все ротаторы на странице
const rotators = document.querySelectorAll('.rotator');

// Функция для запуска одного ротатора
function startRotator(rotator) {
  // Находим все фразы внутри ротатора
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  
  if (cases.length === 0) return;
  
  let currentIndex = 0;
  let currentTimeout = null;
  
  // Функция для применения настроек к элементу
  function applySettings(element) {
    // Применяем цвет из data-color, если он есть
    const color = element.dataset.color;
    if (color) {
      element.style.color = color;
    }
  }
  
  // Функция для получения скорости текущего элемента (по умолчанию 1000 мс)
  function getCurrentSpeed() {
    const currentElement = cases[currentIndex];
    const speed = currentElement.dataset.speed;
    return speed ? parseInt(speed) : 1000;
  }
  
  // Функция переключения на следующий элемент
  function rotate() {
    // Убираем активный класс у текущего элемента
    cases[currentIndex].classList.remove('rotator__case_active');
    
    // Переходим к следующему индексу (с зацикливанием)
    currentIndex = (currentIndex + 1) % cases.length;
    
    // Добавляем активный класс новому элементу
    cases[currentIndex].classList.add('rotator__case_active');
    
    // Применяем настройки к новому активному элементу
    applySettings(cases[currentIndex]);
    
    // Устанавливаем следующий таймаут с индивидуальной скоростью
    const nextSpeed = getCurrentSpeed();
    currentTimeout = setTimeout(rotate, nextSpeed);
  }
  
  // Применяем настройки к первому активному элементу
  const activeElement = cases.find(c => c.classList.contains('rotator__case_active'));
  if (activeElement) {
    applySettings(activeElement);
  }
  
  // Запускаем ротацию с первого таймаута (скорость определяется data-speed текущего элемента)
  const initialSpeed = getCurrentSpeed();
  currentTimeout = setTimeout(rotate, initialSpeed);
}

// Запускаем все ротаторы на странице
rotators.forEach(startRotator);