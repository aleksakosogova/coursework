// phaser-scene.js
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        console.log('=== PRELOAD ПОЧАВСЯ ===');

        this.createTextures();

        const sel = window.SELECTED_CHARACTER;
        const heroPath = sel && sel.img ? sel.img : '../characters/character_1.png';
        this.load.image('playerSprite', heroPath);
        this.load.on('loaderror', (file) => {
            if (file.key === 'playerSprite') {
                console.warn('Не вдалося завантажити спрайт героя, використаємо fallback', file.src);
            }
        });

        console.log('=== PRELOAD ЗАВЕРШЕНО ===');
    }

    createTextures() {
        const gfx = this.make.graphics({ x: 0, y: 0, add: false });

        // Фон
        gfx.fillGradientStyle(0x0e0030, 0x100040, 0x050012, 0x050012, 1);
        gfx.fillRect(0, 0, 700, 500);
        gfx.generateTexture('bgFallback', 700, 500);
        gfx.clear();

        // Персонаж (мінімальний аватар)
        gfx.fillStyle(0xffffff, 0.15).fillRoundedRect(0, 0, 60, 60, 10);
        gfx.fillStyle(0x1b0f2f).fillRoundedRect(4, 4, 52, 52, 8);
        gfx.fillStyle(0x8a4bff).fillRoundedRect(8, 8, 44, 44, 6);
        gfx.fillStyle(0xffc857).fillRect(34, 12, 12, 30);
        gfx.fillStyle(0xffffff).fillCircle(26, 24, 10);
        gfx.fillStyle(0x231336).fillCircle(26, 24, 6);
        gfx.generateTexture('playerFallback', 60, 60);
        gfx.clear();

        // Метеор
        const meteorSize = 76;
        const center = meteorSize / 2;
        gfx.fillStyle(0x2d193a).fillCircle(center, center, center);
        gfx.fillStyle(0x5d3d63).fillCircle(center, center - 4, center - 6);
        gfx.fillStyle(0xbf9edf).fillCircle(center - 14, center - 10, 8);
        gfx.fillStyle(0x8c6fb6).fillCircle(center + 12, center - 4, 6);
        gfx.fillStyle(0x49264f).fillCircle(center - 5, center + 12, 10);
        gfx.lineStyle(2, 0x1b0d22, 0.6);
        gfx.strokeCircle(center - 14, center - 10, 8);
        gfx.strokeCircle(center + 12, center - 4, 6);
        gfx.strokeCircle(center - 5, center + 12, 10);
        gfx.generateTexture('meteorFallback', meteorSize, meteorSize);
        gfx.clear();

        // Камінь
        const stoneSize = 50;
        const stoneCenter = stoneSize / 2;
        gfx.fillStyle(0x4a4a4a).fillCircle(stoneCenter, stoneCenter, stoneCenter);
        gfx.fillStyle(0x6a6a6a).fillCircle(stoneCenter - 5, stoneCenter - 5, 8);
        gfx.fillStyle(0x3a3a3a).fillCircle(stoneCenter + 5, stoneCenter + 5, 6);
        gfx.fillStyle(0x5a5a5a).fillCircle(stoneCenter, stoneCenter - 3, 5);
        gfx.lineStyle(1, 0x2a2a2a, 0.8);
        gfx.strokeCircle(stoneCenter, stoneCenter, stoneCenter);
        gfx.generateTexture('stoneFallback', stoneSize, stoneSize);
        gfx.clear();

        // Зірка
        const starSize = 40;
        const starCenter = starSize / 2;
        const starPoints = 5;
        const outerRadius = starSize / 2 - 2;
        const innerRadius = outerRadius * 0.4;
        
        gfx.fillStyle(0xffd700);
        gfx.beginPath();
        for (let i = 0; i < starPoints * 2; i++) {
            const angle = (i * Math.PI) / starPoints;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = starCenter + Math.cos(angle) * radius;
            const y = starCenter + Math.sin(angle) * radius;
            if (i === 0) {
                gfx.moveTo(x, y);
            } else {
                gfx.lineTo(x, y);
            }
        }
        gfx.closePath();
        gfx.fillPath();
        gfx.lineStyle(2, 0xffed4e, 0.8);
        gfx.strokePath();
        gfx.generateTexture('starFallback', starSize, starSize);
        gfx.clear();
        
        // Серце (бонус життя)
        const heartSize = 35;
        const heartCenter = heartSize / 2;
        gfx.fillStyle(0xff3366);
        gfx.beginPath();
        // Ліва частина серця
        gfx.arc(heartCenter - 6, heartCenter - 2, 8, Math.PI, 0, false);
        // Права частина серця
        gfx.arc(heartCenter + 6, heartCenter - 2, 8, Math.PI, 0, false);
        // Нижня частина (V-форма)
        gfx.lineTo(heartCenter, heartCenter + 12);
        gfx.closePath();
        gfx.fillPath();
        gfx.fillStyle(0xff6b9d);
        gfx.fillCircle(heartCenter - 4, heartCenter - 2, 3);
        gfx.fillCircle(heartCenter + 4, heartCenter - 2, 3);
        gfx.lineStyle(2, 0xff0044, 0.9);
        gfx.strokePath();
        gfx.generateTexture('heartBonus', heartSize, heartSize);
        gfx.clear();
        
        // Монета/зірка бонус (додає очки)
        const coinSize = 32;
        const coinCenter = coinSize / 2;
        gfx.fillStyle(0xffd700);
        gfx.fillCircle(coinCenter, coinCenter, coinCenter - 2);
        gfx.fillStyle(0xffed4e);
        gfx.fillCircle(coinCenter, coinCenter, coinCenter - 4);
        gfx.fillStyle(0xffaa00);
        gfx.fillCircle(coinCenter, coinCenter, 6);
        gfx.lineStyle(2, 0xff8800, 0.8);
        gfx.strokeCircle(coinCenter, coinCenter, coinCenter - 2);
        gfx.generateTexture('coinBonus', coinSize, coinSize);
        gfx.destroy();
    }

    create() {
        console.log('=== CREATE ПОЧАВСЯ ===');

        this.add.image(0, 0, 'bgFallback').setOrigin(0, 0);
        
        // Створюємо зірочки на фоні (трохи менше, щоб не навантажувати гру)
        this.stars = this.add.group();
        for (let i = 0; i < 25; i++) {
            const x = Phaser.Math.Between(0, 700);
            const y = Phaser.Math.Between(0, 500);
            const starSize = Phaser.Math.Between(1, 3);
            const star = this.add.circle(x, y, starSize, 0xffffff, Phaser.Math.FloatBetween(0.3, 1));
            this.stars.add(star);
        }
        
        // Анімація зірочок (блимання) - плавна
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                this.stars.children.entries.forEach(star => {
                    if (Phaser.Math.Between(0, 100) < 20) {
                        this.tweens.add({
                            targets: star,
                            alpha: Phaser.Math.FloatBetween(0.3, 1),
                            duration: Phaser.Math.Between(1000, 2000),
                            ease: 'Sine.easeInOut',
                            yoyo: true,
                            repeat: 1
                        });
                    }
                });
            }
        });

        // Перевірка чи спрайт персонажа завантажився
        let playerTexture = 'playerFallback';
        let playerScale = 1.05;
        
        if (this.textures.exists('playerSprite')) {
            playerTexture = 'playerSprite';
            playerScale = 1.0;
            console.log('Використовується спрайт персонажа з файлу');
        } else {
            console.log('Використовується fallback спрайт персонажа');
        }
        
        this.player = this.physics.add.sprite(350, 430, playerTexture);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(playerScale);

        // Додаткова перевірка - якщо спрайт не відображається, використати fallback
        if (!this.player.visible) {
            console.warn('Спрайт не видимий, використовуємо fallback');
            this.player.setTexture('playerFallback');
            this.player.setScale(1.05);
        }

        this.obstacles = this.physics.add.group();
        this.bonuses = this.physics.add.group(); // Група для бонусів
        this.cursors = this.input.keyboard.createCursorKeys();

        const settings = JSON.parse(localStorage.getItem('DSE_settings') || '{}');
        const difficulty = settings.difficulty || 'normal';
        this.playerSpeed = settings.playerSpeed || 260;
        const spawnDelay = settings.asteroidFreq || 650;

        let speedMultiplier = 1.1; // базово трохи швидше
        if (difficulty === 'easy') speedMultiplier = 0.9;
        if (difficulty === 'hard') speedMultiplier = 1.4;

        // Функція створення об'єкта
        const createObstacle = () => {
            if (this.gameOver) return;
            
            const x = Phaser.Math.Between(40, 660);
            const objectType = Phaser.Math.Between(0, 100);
            
            // Розраховуємо поточну швидкість з урахуванням помірного прискорення
            const currentSpeedMultiplier = 1 + (this.gameTime / 9000) * 0.18; // поступове, але відчутне прискорення
            const maxSpeedMultiplier = 2.3; // все ще іграбельно
            const finalSpeedMultiplier = Math.min(currentSpeedMultiplier, maxSpeedMultiplier);
            
            let obstacle;
            if (objectType < 40) {
                // Метеорити (40% шанс)
                obstacle = this.obstacles.create(x, -30, 'meteorFallback');
                obstacle.setVelocityY(this.baseSpeed * finalSpeedMultiplier);
                const scale = Phaser.Math.FloatBetween(0.65, 0.95);
                obstacle.setScale(scale);
                obstacle.setAngle(Phaser.Math.Between(0, 360));
            } else if (objectType < 70) {
                // Камені (30% шанс)
                obstacle = this.obstacles.create(x, -30, 'stoneFallback');
                obstacle.setVelocityY((this.baseSpeed * 1.125) * finalSpeedMultiplier);
                const scale = Phaser.Math.FloatBetween(0.7, 1.0);
                obstacle.setScale(scale);
                obstacle.setAngle(Phaser.Math.Between(0, 360));
            } else {
                // Зірки (30% шанс)
                obstacle = this.obstacles.create(x, -30, 'starFallback');
                obstacle.setVelocityY((this.baseSpeed * 0.875) * finalSpeedMultiplier);
                const scale = Phaser.Math.FloatBetween(0.6, 0.9);
                obstacle.setScale(scale);
                obstacle.setAngle(Phaser.Math.Between(0, 360));
            }
        };
        
        // Створення об'єктів що падають з фіксованим інтервалом
        this.spawnEvent = this.time.addEvent({
            delay: spawnDelay,
            loop: true,
            callback: () => {
                createObstacle();
            }
        });
        
        // Створення бонусів (сердечки та монети)
        this.bonusSpawnEvent = this.time.addEvent({
            delay: 7000, // Трохи частіше, щоб бонуси були помітні
            loop: true,
            callback: () => {
                if (this.gameOver) return;
                
                const bonusType = Phaser.Math.Between(0, 100);
                const x = Phaser.Math.Between(40, 660);
                let bonus;
                
                if (bonusType < 25) {
                    // Серце (≈25% шанс, але все ще рідше за монети) — додає життя
                    bonus = this.bonuses.create(x, -30, 'heartBonus');
                    bonus.bonusType = 'life';
                } else {
                    // Монета (решта часу) — додає очки
                    bonus = this.bonuses.create(x, -30, 'coinBonus');
                    bonus.bonusType = 'score';
                }
                
                // Швидкість бонусів фіксована, щоб уникнути лагів
                bonus.setVelocityY(this.baseSpeed * 0.9); // Трохи повільніше за перешкоди
                bonus.setScale(Phaser.Math.FloatBetween(0.8, 1.1));
                
                // Анімація обертання
                bonus.setAngularVelocity(Phaser.Math.Between(-150, 150));
                
                // Пульсація
                this.tweens.add({
                    targets: bonus,
                    scaleX: bonus.scaleX * 1.2,
                    scaleY: bonus.scaleY * 1.2,
                    duration: 500,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });

        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
        this.physics.add.overlap(this.player, this.bonuses, this.collectBonus, null, this);

        this.lives = 5;
        this.maxLives = 7; // Максимальна кількість життів
        this.score = 0;
        this.gameOver = false;
        this.gameTime = 0; // Час гри в мілісекундах
        this.baseSpeed = 160 * speedMultiplier; // Базова швидкість
        this.speedIncrease = 0.5; // Збільшення швидкості кожні 10 секунд

        this.livesText = this.add.text(20, 20, 'Життя: ' + this.lives, {
            fontSize: '20px',
            fill: '#ff5555',
            fontFamily: '"Press Start 2P", monospace',
            fontStyle: 'normal'
        });
        this.scoreText = this.add.text(20, 50, 'Очки: ' + this.score, {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: '"Press Start 2P", monospace'
        });

        this.gameOverText = this.add.text(350, 210, '', {
            fontSize: '32px',
            fill: '#ff3366',
            fontFamily: '"Press Start 2P", monospace',
            fontStyle: 'normal'
        }).setOrigin(0.5).setVisible(false);

        this.restartText = this.add.text(350, 270, 'Натисни R, щоб перезапустити', {
            fontSize: '14px',
            fill: '#ffffff',
            fontFamily: '"Press Start 2P", monospace'
        }).setOrigin(0.5).setVisible(false);

        this.restartKey = this.input.keyboard.addKey('R');

        console.log('=== CREATE ЗАВЕРШЕНО ===');
    }

    update(time, delta) {
        if (this.gameOver) {
            // Перезапуск при натисканні R
            if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
                this.scene.restart();
            }
            return;
        }
        
        // Оновлення часу гри
        this.gameTime += delta;
        
        // Рух персонажа стрілками
        this.player.setVelocityX(0);
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }
        
        // Очки за уникнення об'єктів
        this.obstacles.children.entries.forEach(obstacle => {
            if (obstacle.y > 550) {
                obstacle.destroy();
                this.score += 1;
                this.scoreText.setText('Очки: ' + this.score);
            }
        });
        
        // Видалення бонусів що вийшли за межі
        this.bonuses.children.entries.forEach(bonus => {
            if (bonus.y > 550) {
                bonus.destroy();
            }
        });
    }

    hitObstacle(player, obstacle) {
        if (this.gameOver) return;
        
        // Знищити об'єкт
        obstacle.destroy();
        
        // Втрата 1 життя
        this.lives -= 1;
        this.livesText.setText('Життя: ' + this.lives);
        
        // Ефект трясіння камери
        this.cameras.main.shake(200, 0.01);
        
        // Ефект червоного відтінку на короткий час
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            if (!this.gameOver) {
                this.player.clearTint();
            }
        });
        
        // Перевірка на завершення гри
        if (this.lives <= 0) {
            this.endGame();
        }
    }
    
    collectBonus(player, bonus) {
        if (this.gameOver) return;
        
        // Захист від багаторазового спрацювання одного бонуса
        if (bonus.collected) return;
        bonus.collected = true;
        
        // Ефект збору
        const bonusX = bonus.x;
        const bonusY = bonus.y;
        
        // Анімація зникнення
        this.tweens.add({
            targets: bonus,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            duration: 200,
            ease: 'Back.easeIn',
            onComplete: () => {
                bonus.destroy();
            }
        });
        
        // Ефект частинок
        for (let i = 0; i < 8; i++) {
            const particle = this.add.circle(bonusX, bonusY, 3, bonus.bonusType === 'life' ? 0xff3366 : 0xffd700);
            this.tweens.add({
                targets: particle,
                x: bonusX + Phaser.Math.Between(-30, 30),
                y: bonusY + Phaser.Math.Between(-30, 30),
                alpha: 0,
                duration: 400,
                ease: 'Power2',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
        
        if (bonus.bonusType === 'life') {
            // Додаємо максимум +1 життя, але не перевищуємо межу
            if (this.lives < this.maxLives) {
                this.lives += 1;
                this.livesText.setText('Життя: ' + this.lives);
                
                // Ефект зеленого відтінку
                this.player.setTint(0x00ff00);
                this.time.delayedCall(300, () => {
                    if (!this.gameOver) {
                        this.player.clearTint();
                    }
                });
                
                // Текст "+1 Життя"
                const plusText = this.add.text(bonusX, bonusY - 20, '+1 Життя', {
                    fontSize: '16px',
                    fill: '#00ff00',
                    fontFamily: '"Press Start 2P", monospace'
                }).setOrigin(0.5);
                this.tweens.add({
                    targets: plusText,
                    y: plusText.y - 30,
                    alpha: 0,
                    duration: 600,
                    ease: 'Power2',
                    onComplete: () => {
                        plusText.destroy();
                    }
                });
            }
        } else {
            // Додаємо очки
            const points = Phaser.Math.Between(10, 25);
            this.score += points;
            this.scoreText.setText('Очки: ' + this.score);
            
            // Ефект золотого відтінку
            this.player.setTint(0xffd700);
            this.time.delayedCall(200, () => {
                if (!this.gameOver) {
                    this.player.clearTint();
                }
            });
            
            // Текст "+X Очок"
            const plusText = this.add.text(bonusX, bonusY - 20, '+' + points + ' Очок', {
                fontSize: '14px',
                fill: '#ffd700',
                fontFamily: '"Press Start 2P", monospace'
            }).setOrigin(0.5);
            this.tweens.add({
                targets: plusText,
                y: plusText.y - 30,
                alpha: 0,
                duration: 600,
                ease: 'Power2',
                onComplete: () => {
                    plusText.destroy();
                }
            });
        }
    }
    
    endGame() {
        this.gameOver = true;
        
        // Червоний відтінок персонажа
        this.player.setTint(0xff0000);
        
        // Показати текст про завершення
        this.gameOverText.setText('ГРА ЗАВЕРШЕНА!');
        this.gameOverText.setVisible(true);
        this.restartText.setVisible(true);
        
        // Зупинити створення нових об'єктів
        this.time.removeAllEvents();
        
        // Зупинити рух персонажа
        this.player.setVelocityX(0);
        
        console.log('=== ГРА ЗАВЕРШЕНА ===');
    }
}
