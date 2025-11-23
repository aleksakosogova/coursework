// game-init.js
// Перевірка що код виконується в браузері
if (typeof window === 'undefined' || typeof document === 'undefined') {
  console.error('Цей код призначений для виконання в браузері, а не в Node.js');
  // Якщо це Node.js, просто виходимо
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {};
  }
} else {
  // Код для браузера
  window.SELECTED_CHARACTER = null;
  const settings = JSON.parse(localStorage.getItem('DSE_settings') || '{}');

try {
  const s = localStorage.getItem('selectedCharacter');
  if (s) {
    const parsed = JSON.parse(s);
    // Перевірка що це валідний об'єкт з необхідними полями
    if (parsed && typeof parsed === 'object' && parsed.id !== undefined && parsed.img) {
      window.SELECTED_CHARACTER = parsed;
    } else {
      console.warn('Невалідні дані персонажа в localStorage');
      window.SELECTED_CHARACTER = null;
    }
  }
} catch(e) { 
  console.warn('Помилка при завантаженні персонажа:', e);
  window.SELECTED_CHARACTER = null;
}

window.addEventListener('load', () => {
  // Перевірка чи Phaser завантажився
  if (typeof Phaser === 'undefined') {
    console.error('Phaser не завантажено! Перевірте підключення скрипта.');
    document.getElementById('gameArea').innerHTML = '<p style="color:red;text-align:center;padding:20px">Помилка: Phaser не завантажено. Перевірте інтернет-з\'єднання.</p>';
    return;
  }
  
  // Перевірка чи MainScene визначений
  if (typeof MainScene === 'undefined') {
    console.error('MainScene не визначено! Перевірте порядок завантаження скриптів.');
    document.getElementById('gameArea').innerHTML = '<p style="color:red;text-align:center;padding:20px">Помилка: MainScene не визначено.</p>';
    return;
  }
  
  // Перевірка чи існує gameArea
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) {
    console.error('Елемент gameArea не знайдено!');
    return;
  }
  
  // налаштування складності впливають на швидкість падаючих об'єктів
  const difficulty = settings.difficulty || 'normal';
  let speedFactor = 1;
  if (difficulty === 'easy') speedFactor = 0.8;
  if (difficulty === 'hard') speedFactor = 1.3;

  try {
    console.log('Створення конфігурації Phaser...');
    console.log('SELECTED_CHARACTER:', window.SELECTED_CHARACTER);
    console.log('Settings:', settings);
    
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'gameArea',
      backgroundColor: '#050012',
      physics: { 
        default: 'arcade', 
        arcade: { 
          gravity: { y: 0 }, 
          debug: false 
        } 
      },
      scene: [MainScene],
      custom: { speedFactor }
    };
    
    console.log('Ініціалізація Phaser Game...');
    window.game = new Phaser.Game(config);
    console.log('Phaser гра успішно ініціалізована');
  } catch (error) {
    console.error('Помилка ініціалізації Phaser гри:', error);
    console.error('Stack:', error.stack);
    gameArea.innerHTML = '<p style="color:red;text-align:center;padding:20px">Помилка ініціалізації гри: ' + error.message + '</p>';
  }
});
} // Кінець перевірки браузерного середовища
