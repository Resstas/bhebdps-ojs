document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');
  
  // Функция отображения валют
  function displayCurrencies(valute) {
    itemsContainer.innerHTML = '';
    
    for (const currencyCode in valute) {
      const currency = valute[currencyCode];
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      `;
      itemsContainer.appendChild(item);
    }
  }
  
  // Проверяем кэш в localStorage
  const cachedData = localStorage.getItem('currencyRates');
  const cachedTime = localStorage.getItem('currencyRatesTime');
  const ONE_HOUR = 60 * 60 * 1000; // 1 час
  
  // Если есть кэш и он не устарел (меньше часа)
  if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < ONE_HOUR) {
    // Показываем кэшированные данные сразу
    const valute = JSON.parse(cachedData);
    displayCurrencies(valute);
    loader.classList.remove('loader_active');
  } else {
    // Нет кэша или кэш устарел - показываем анимацию
    loader.classList.add('loader_active');
  }
  
  // Загружаем свежие данные с сервера
  const startTime = Date.now();
  
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(data => {
      const valute = data.response.Valute;
      
      // Сохраняем в localStorage
      localStorage.setItem('currencyRates', JSON.stringify(valute));
      localStorage.setItem('currencyRatesTime', Date.now().toString());
      
      // Обновляем отображение
      displayCurrencies(valute);
      
      // Скрываем анимацию (с минимальной задержкой для видимости)
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 500 - elapsed);
      setTimeout(() => {
        loader.classList.remove('loader_active');
      }, remaining);
    })
    .catch(error => {
      console.error('Ошибка:', error);
      loader.classList.remove('loader_active');
      
      // Если кэша нет и загрузка не удалась
      if (!cachedData) {
        itemsContainer.innerHTML = '<div class="error">Ошибка загрузки данных</div>';
      }
    });
});