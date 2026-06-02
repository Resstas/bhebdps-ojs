document.addEventListener('DOMContentLoaded', () => {
  // Находим все элементы с классом has-tooltip
  const tooltipElements = document.querySelectorAll('.has-tooltip');
  
  // Переменная для хранения текущей активной подсказки
  let activeTooltip = null;
  
  // Функция для создания и позиционирования подсказки
  function createTooltip(element, position = 'bottom') {
    // Получаем текст подсказки из атрибута title
    const tooltipText = element.getAttribute('title');
    
    // Создаём элемент подсказки
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    // Получаем координаты целевого элемента
    const elementRect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Позиционируем подсказку в зависимости от параметра
    switch(position) {
      case 'top':
        tooltip.style.top = `${elementRect.top + scrollTop - tooltip.offsetHeight - 5}px`;
        tooltip.style.left = `${elementRect.left + scrollLeft}px`;
        break;
      case 'left':
        tooltip.style.top = `${elementRect.top + scrollTop}px`;
        tooltip.style.left = `${elementRect.left + scrollLeft - tooltip.offsetWidth - 5}px`;
        break;
      case 'right':
        tooltip.style.top = `${elementRect.top + scrollTop}px`;
        tooltip.style.left = `${elementRect.right + scrollLeft + 5}px`;
        break;
      case 'bottom':
      default:
        tooltip.style.top = `${elementRect.bottom + scrollTop + 5}px`;
        tooltip.style.left = `${elementRect.left + scrollLeft}px`;
        break;
    }
    
    return tooltip;
  }
  
  // Функция для скрытия всех подсказок
  function hideAllTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
      tooltip.remove();
    });
    activeTooltip = null;
  }
  
  // Функция для показа подсказки
  function showTooltip(element) {
    // Скрываем все существующие подсказки (повышенный уровень #1)
    hideAllTooltips();
    
    // Определяем позицию для подсказки (повышенный уровень #2)
    let position = 'bottom';
    const dataPosition = element.getAttribute('data-position');
    if (dataPosition && ['top', 'left', 'right', 'bottom'].includes(dataPosition)) {
      position = dataPosition;
    }
    
    // Создаём и добавляем подсказку
    const tooltip = createTooltip(element, position);
    document.body.appendChild(tooltip);
    
    // Активируем подсказку
    tooltip.classList.add('tooltip_active');
    activeTooltip = tooltip;
    
    // Сохраняем ссылку на элемент, к которому привязана подсказка
    tooltip.relatedElement = element;
  }
  
  // Добавляем обработчики событий для каждого элемента
  tooltipElements.forEach(element => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      
      // Проверяем, открыта ли уже подсказка для этого элемента
      const existingTooltip = document.querySelector('.tooltip');
      if (existingTooltip && existingTooltip.relatedElement === element) {
        // Если подсказка уже открыта - закрываем её
        hideAllTooltips();
      } else {
        // Иначе открываем новую подсказку
        showTooltip(element);
      }
    });
  });
  
  // Закрываем подсказку при клике в любом другом месте
  document.addEventListener('click', (event) => {
    // Проверяем, был ли клик не по элементу с подсказкой и не по самой подсказке
    if (!event.target.classList || !event.target.classList.contains('has-tooltip')) {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip && tooltip !== event.target && !tooltip.contains(event.target)) {
        hideAllTooltips();
      }
    }
  });
});