// character-select.js
// Очікує файли ../characters/character_1.png ... character_12.png

const characters = [
    { id:1, img:'../characters/character_1.png', name:'Кайтос Руст', title:'Лицар-Щит', lore:'Витягнутий з уламків цитаделі, оберігає слабких.', hp:88, atk:12, spd:6 },
    { id:2, img:'../characters/character_2.png', name:'Міра Страж', title:'Маг-стрілець', lore:'Колись мисливець за зорями, тепер боронить кордони.', hp:68, atk:18, spd:7 },
    { id:3, img:'../characters/character_3.png', name:'Елла Файр', title:'Палаюча Варта', lore:'Полум\'я її серця зупиняє найтемніші вороже.', hp:72, atk:15, spd:8 },
    { id:4, img:'../characters/character_4.png', name:'Таро Блейд', title:'Острієвий Мандрівник', lore:'Несучий маску предків і таємниці старих рун.', hp:92, atk:10, spd:5 },
    { id:5, img:'../characters/character_5.png', name:'Грон Вік', title:'Дуб Крила', lore:'Ветеран багатьох битв, спокійний як скеля.', hp:110, atk:20, spd:3 },
    { id:6, img:'../characters/character_6.png', name:'Рейна Клир', title:'Булава Суду', lore:'Непохитна охоронниця, що ставить захист понад все.', hp:86, atk:14, spd:6 },
    { id:7, img:'../characters/character_7.png', name:'Ліан Свіфт', title:'Тіньовий Розвідник', lore:'Швидка і вивертка, що зникає та з\'являється', hp:62, atk:11, spd:13 },
    { id:8, img:'../characters/character_8.png', name:'Зіра Арчер', title:'Лісовий Воїн', lore:'Майстер ближнього бою, чия сила та спритність стали легендою.', hp:58, atk:17, spd:10 },
    { id:9, img:'../characters/character_9.png', name:'Том Рур', title:'Господар Селища', lore:'Звичний герой, що завжди повертається заради рідних.', hp:76, atk:11, spd:9 },
    { id:10, img:'../characters/character_10.png', name:'Кел Він', title:'Юний Воїн', lore:'Палке серце і гострий розум роблять його небезпечним.', hp:72, atk:16, spd:11 },
    { id:11, img:'../characters/character_11.png', name:'Ара Найт', title:'Нічний Рейнджер', lore:'Воїн, що бачить у темряві й карає тінь.', hp:66, atk:13, spd:13 },
    { id:12, img:'../characters/character_12.png', name:'Енно Лорд', title:'Відважний Комендант', lore:'Командир із сталевим духом, що веде за собою.', hp:98, atk:14, spd:5 }
  ];
  
  let idx = 0;
  const imgEl = document.getElementById('charImg');
  const nameEl = document.getElementById('charName');
  const titleEl = document.getElementById('charTitle');
  const loreEl = document.getElementById('charLore');
  const hpEl = document.getElementById('hp');
  const atkEl = document.getElementById('atk');
  const spdEl = document.getElementById('spd');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const chooseBtn = document.getElementById('chooseBtn');
  const startBtn = document.getElementById('startGameBtn');
  
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
      
      setTimeout(() => {
        nameEl.textContent = c.name + ' —';
        titleEl.textContent = c.title;
        loreEl.textContent = c.lore;
        hpEl.textContent = c.hp;
        atkEl.textContent = c.atk;
        spdEl.textContent = c.spd;
        
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1) translateY(0)';
        nameEl.style.opacity = '1';
        titleEl.style.opacity = '1';
        loreEl.style.opacity = '1';
      }, 50);
    }, 300);
  }
  
  // Перевірка чи обрано поточного персонажа
  function checkSelectedCharacter() {
    try {
      const selectedStr = localStorage.getItem('selectedCharacter');
      if (!selectedStr) {
        // Якщо немає збереженого персонажа, скинути кнопку
        chooseBtn.textContent = 'Обрати персонажа';
        chooseBtn.style.background = 'linear-gradient(90deg, #7b3cff, #5a189a)';
        chooseBtn.style.cursor = 'pointer';
        return;
      }
      
      const selected = JSON.parse(selectedStr);
      // Перевірка що selected є об'єктом і має id, і що id співпадає з поточним
      if (selected && typeof selected === 'object' && selected.id !== undefined && selected.id === characters[idx].id) {
        chooseBtn.textContent = '✓ Персонажа обрано';
        chooseBtn.style.background = 'linear-gradient(90deg, #2d7a2d, #4caf50)';
        chooseBtn.style.cursor = 'default';
      } else {
        chooseBtn.textContent = 'Обрати персонажа';
        chooseBtn.style.background = 'linear-gradient(90deg, #7b3cff, #5a189a)';
        chooseBtn.style.cursor = 'pointer';
      }
    } catch(e) {
      console.warn('Помилка при перевірці обраного персонажа:', e);
      chooseBtn.textContent = 'Обрати персонажа';
      chooseBtn.style.background = 'linear-gradient(90deg, #7b3cff, #5a189a)';
      chooseBtn.style.cursor = 'pointer';
    }
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
    chooseBtn.textContent = '✓ Персонажа обрано';
    chooseBtn.style.background = 'linear-gradient(90deg, #2d7a2d, #4caf50)';
    chooseBtn.style.cursor = 'default';
  });
  
  startBtn.addEventListener('click', () => {
    // зберегти якщо ще не збережено
    localStorage.setItem('selectedCharacter', JSON.stringify(characters[idx]));
    window.location.href = 'game.html';
  });
  
  // init
  renderCharacter();
  // Перевірка після завершення анімації
  setTimeout(() => {
    checkSelectedCharacter();
  }, 400);
  