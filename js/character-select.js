// character-select.js
// Очікує файли ../characters/character_1.png ... character_12.png

const characters = [
    { id:1, img:'../characters/character_1.png', name:'Кайтос Руст', title:'Лицар-Щит', lore:'Витягнутий з уламків цитаделі, оберігає слабких.', quote:'"Щит мій — це моя честь"'},
    { id:2, img:'../characters/character_2.png', name:'Міра Страж', title:'Маг-стрілець', lore:'Колись мисливець за зорями, тепер боронить кордони.', quote:'"Зорі вказують шлях"'},
    { id:3, img:'../characters/character_3.png', name:'Елла Файр', title:'Палаюча Варта', lore:'Полум\'я її серця зупиняє найтемніші вороже.', quote:'"Вогонь очищає все"'},
    { id:4, img:'../characters/character_4.png', name:'Таро Блейд', title:'Острієвий Мандрівник', lore:'Несучий маску предків і таємниці старих рун.', quote:'"Маска приховує, але не змінює"'},
    { id:5, img:'../characters/character_5.png', name:'Грон Вік', title:'Дуб Крила', lore:'Ветеран багатьох битв, спокійний як скеля.', quote:'"Досвід — найкращий учитель"'},
    { id:6, img:'../characters/character_6.png', name:'Рейна Клир', title:'Булава Суду', lore:'Непохитний охоронник, що ставить захист понад все.', quote:'"Захист — це моя місія"'},
    { id:7, img:'../characters/character_7.png', name:'Ліан Свіфт', title:'Тіньовий Розвідник', lore:'Швидкий і виверткий, що зникає та з\'являється', quote:'"Тінь завжди поруч"'},
    { id:8, img:'../characters/character_8.png', name:'Зіра Арчер', title:'Лісовий Воїн', lore:'Майстер ближнього бою, чия сила та спритність стали легендою.', quote:'"Сила в русі"'},
    { id:9, img:'../characters/character_9.png', name:'Том Рур', title:'Господар Селища', lore:'Звичний герой, що завжди повертається заради рідних.', quote:'"Дім — це там, де серце"'},
    { id:10, img:'../characters/character_10.png', name:'Кел Він', title:'Юний Воїн', lore:'Палке серце і гострий розум роблять його небезпечним.', quote:'"Молодість — це сила"'},
    { id:11, img:'../characters/character_11.png', name:'Ара Найт', title:'Нічний Рейнджер', lore:'Воїн, що бачить у темряві й карає тінь.', quote:'"Темрява — мій союзник"'},
    { id:12, img:'../characters/character_12.png', name:'Енно Лорд', title:'Відважний Комендант', lore:'Командир із сталевим духом, що веде за собою.', quote:'"Відвага веде до перемоги"'}
  ];
  
  let idx = 0;
  const imgEl = document.getElementById('charImg');
  const nameEl = document.getElementById('charName');
  const titleEl = document.getElementById('charTitle');
  const loreEl = document.getElementById('charLore');
  const quoteEl = document.getElementById('charQuote');
  const charNumberEl = document.getElementById('charNumber');
  const totalCharsEl = document.getElementById('totalChars');
  
  // Встановлюємо загальну кількість персонажів
  totalCharsEl.textContent = characters.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const chooseBtn = document.getElementById('chooseBtn');
  const startBtn = document.getElementById('startGameBtn');

  // Стильне попередження під кнопками (замість стандартного alert)
  const actionsWrap = document.querySelector('.char-actions');
  let warningEl = null;
  if (actionsWrap) {
    warningEl = document.createElement('p');
    warningEl.className = 'select-warning';
    warningEl.textContent = 'Оберіть персонажа перед початком гри.';
    warningEl.style.display = 'none';
    actionsWrap.appendChild(warningEl);
  }

  function renderCharacter(oldIdx = null) {
    const c = characters[idx];
  
    // плавний перехід: fade-out -> змінити src -> fade-in
    imgEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.9) translateY(10px)';
    
    setTimeout(() => {
      imgEl.src = c.img;
      nameEl.style.transition = 'opacity 0.3s ease';
      nameEl.style.opacity = '0';
      titleEl.style.transition = 'opacity 0.3s ease';
      titleEl.style.opacity = '0';
      loreEl.style.transition = 'opacity 0.3s ease';
      loreEl.style.opacity = '0';
      quoteEl.style.transition = 'opacity 0.3s ease';
      quoteEl.style.opacity = '0';
      
      setTimeout(() => {
        nameEl.textContent = c.name + ' —';
        titleEl.textContent = c.title;
        loreEl.textContent = c.lore;
        quoteEl.textContent = c.quote || '"..."';
        charNumberEl.textContent = c.id;
        
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1) translateY(0)';
        nameEl.style.opacity = '1';
        titleEl.style.opacity = '1';
        loreEl.style.opacity = '1';
        quoteEl.style.opacity = '1';
      }, 50);
    }, 300);
  }
  
  // Зберігаємо інформацію про те, чи була кнопка натиснута для поточного персонажа
  // Це окрема змінна, яка оновлюється ТІЛЬКИ при натисканні кнопки
  let clickedCharacterId = null;
  
  // Перевірка чи обрано поточного персонажа (тільки якщо кнопка була натиснута)
  function checkSelectedCharacter() {
    // Кнопка зелена тільки якщо саме цей персонаж був обраний через натискання кнопки
    // І поточний індекс співпадає з обраним
    if (clickedCharacterId === characters[idx].id) {
      chooseBtn.textContent = '✓ Персонажа обрано';
      chooseBtn.style.background = 'linear-gradient(90deg, #2d7a2d, #4caf50)';
      chooseBtn.style.cursor = 'default';
    } else {
      chooseBtn.textContent = 'Обрати персонажа';
      chooseBtn.style.background = 'linear-gradient(90deg, #7b3cff, #5a189a)';
      chooseBtn.style.cursor = 'pointer';
    }
  }
  
  // Завантаження збереженого персонажа при старті (тільки для відображення)
  function loadSelectedCharacter() {
    // Не встановлюємо clickedCharacterId при завантаженні,
    // щоб кнопка не була зеленою автоматично
    // clickedCharacterId залишається null до натискання кнопки
  }
  
  // events
  prevBtn.addEventListener('click', () => { 
    idx = (idx - 1 + characters.length) % characters.length; 
    renderCharacter();
    // Перевірка після завершення анімації
    setTimeout(() => {
      checkSelectedCharacter();
    }, 400);
  });
  nextBtn.addEventListener('click', () => { 
    idx = (idx + 1) % characters.length; 
    renderCharacter();
    // Перевірка після завершення анімації
    setTimeout(() => {
      checkSelectedCharacter();
    }, 400);
  });
  
  chooseBtn.addEventListener('click', () => {
    localStorage.setItem('selectedCharacter', JSON.stringify(characters[idx]));
    clickedCharacterId = characters[idx].id; // Зберігаємо що саме цей персонаж обраний через натискання
    chooseBtn.textContent = '✓ Персонажа обрано';
    chooseBtn.style.background = 'linear-gradient(90deg, #2d7a2d, #4caf50)';
    chooseBtn.style.cursor = 'default';
  });
  
  startBtn.addEventListener('click', () => {
    // Якщо персонажа явно не обрано — показати попап і не запускати гру
    if (clickedCharacterId === null) {
      if (warningEl) {
        warningEl.style.display = 'block';
        // Невелика анімація появи
        warningEl.classList.remove('visible');
        // force reflow
        void warningEl.offsetWidth;
        warningEl.classList.add('visible');
      }
      return;
    }

    // Переконаємось, що збережений саме обраний персонаж
    const selected = characters.find(c => c.id === clickedCharacterId) || characters[idx];
    localStorage.setItem('selectedCharacter', JSON.stringify(selected));
    window.location.href = 'game.html';
  });
  
  // init
  loadSelectedCharacter(); // Завантажити збереженого персонажа
  renderCharacter();
  // Перевірка після завершення анімації
  setTimeout(() => {
    checkSelectedCharacter();
  }, 400);
  