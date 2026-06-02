// Находим все пункты меню, которые могут иметь вложенное подменю
const menuLinks = document.querySelectorAll('.menu__link');

// Функция для закрытия всех открытых подменю
function closeAllSubmenus() {
  const activeSubmenus = document.querySelectorAll('.menu_sub.menu_active');
  activeSubmenus.forEach(submenu => {
    submenu.classList.remove('menu_active');
  });
}

// Добавляем обработчик для каждой ссылки меню
menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    // Находим родительский элемент li с классом menu__item
    const menuItem = this.closest('.menu__item');
    
    // Ищем в этом menu__item вложенное подменю (с классом menu_sub)
    const submenu = menuItem.querySelector('.menu_sub');
    
    // Если подменю существует (пункт имеет вложенное меню)
    if (submenu) {
      // Предотвращаем переход по ссылке
      event.preventDefault();
      
      // Проверяем, открыто ли текущее подменю
      const isActive = submenu.classList.contains('menu_active');
      
      // Закрываем все открытые подменю (для повышенного уровня сложности)
      closeAllSubmenus();
      
      // Если текущее подменю не было открыто, открываем его
      if (!isActive) {
        submenu.classList.add('menu_active');
      }
      // Если было открыто - закрываем (уже закрыли через closeAllSubmenus)
    }
    // Если подменю нет - ссылка работает как обычно
  });
});