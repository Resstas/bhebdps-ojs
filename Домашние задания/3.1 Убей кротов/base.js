(() => {
  let playing = true,
    activeHole = 1;
  
  // --- ДОБАВИТЬ: Счётчики ---
  let dead = 0;
  let lost = 0;
  
  // --- ДОБАВИТЬ: Получаем элементы для отображения счётчиков ---
  const deadCounter = document.getElementById('dead');
  const lostCounter = document.getElementById('lost');

  const stop = () => playing = true,
    getHole = index => document.getElementById(`hole${index}`),
    deactivateHole = index =>
      getHole(index).className = 'hole',
    activateHole = index =>
      getHole(index).className = 'hole hole_has-mole',
    next = () => setTimeout(() => {
      if (!playing) {
        return;
      }
      deactivateHole(activeHole);
      activeHole = Math.floor(1 + Math.random() * 9);
      activateHole(activeHole);
      next();
    }, 800);

  // --- ДОБАВИТЬ: Функция сброса игры ---
  function resetGame(message) {
    dead = 0;
    lost = 0;
    deadCounter.textContent = dead;
    lostCounter.textContent = lost;
    alert(message);
  }

  // --- ДОБАВИТЬ: Обработчики кликов для всех лунок ---
  for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    
    hole.onclick = function() {
      // Проверяем, есть ли крот в этой лунке
      if (hole.classList.contains('hole_has-mole')) {
        // Попадание - убиваем крота
        dead++;
        deadCounter.textContent = dead;
        
        // Проверка победы
        if (dead === 10) {
          resetGame('Поздравляем! Вы победили!');
        }
      } else {
        // Промах
        lost++;
        lostCounter.textContent = lost;
        
        // Проверка поражения
        if (lost === 5) {
          resetGame('Вы проиграли! Попробуйте снова.');
        }
      }
    };
  }

  next();
})();
