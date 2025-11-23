// phaser-scene.js
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        console.log('=== PRELOAD ПОЧАВСЯ ===');
        
        // Створюємо простий фон (темний колір)
        this.add.graphics()
            .fillStyle(0x050012)
            .fillRect(0, 0, 800, 600)
            .generateTexture('bg', 800, 600);
        
        // Створюємо спрайт персонажа (фіолетовий прямокутник)
        this.add.graphics()
            .fillStyle(0x8a4bff)
            .fillRect(0, 0, 60, 60)
            .generateTexture('player', 60, 60);
        
        // Створюємо спрайт об'єкта (сірий круг)
        this.add.graphics()
            .fillStyle(0x888888)
            .fillCircle(20, 20, 20)
            .generateTexture('obstacle', 40, 40);
        
        console.log('=== PRELOAD ЗАВЕРШЕНО ===');
    }

    create() {
        console.log('=== CREATE ПОЧАВСЯ ===');
        
        // Фон
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        
        // Персонаж внизу екрану
        this.player = this.physics.add.sprite(400, 550, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0);
        
        // Група для об'єктів, що падають
        this.obstacles = this.physics.add.group();
        
        // Клавіатура
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Налаштування
        const settings = JSON.parse(localStorage.getItem('DSE_settings') || '{}');
        const playerSpeed = settings.playerSpeed || 260;
        const asteroidFreq = settings.asteroidFreq || 700;
        const difficulty = settings.difficulty || 'normal';
        
        let speedFactor = 1;
        if (difficulty === 'easy') speedFactor = 0.8;
        if (difficulty === 'hard') speedFactor = 1.3;
        
        this.playerSpeed = playerSpeed;
        
        // Створення об'єктів, що падають
        this.time.addEvent({
            delay: asteroidFreq,
            loop: true,
            callback: () => {
                if (this.gameOver) return;
                
                const x = Phaser.Math.Between(50, 750);
                const obstacle = this.obstacles.create(x, -20, 'obstacle');
                obstacle.setVelocityY(150 * speedFactor);
                obstacle.setCollideWorldBounds(false);
            }
        });
        
        // Колізія між персонажем та об'єктами
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
        
        // Ігрові змінні
        this.lives = 5; // Початкова кількість життів
        this.score = 0;
        this.gameOver = false;
        
        // Текст на екрані
        this.livesText = this.add.text(20, 20, 'Життя: ' + this.lives, {
            fontSize: '24px',
            fill: '#ff4444',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        });
        
        this.scoreText = this.add.text(20, 60, 'Очки: ' + this.score, {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        
        // Текст про завершення гри
        this.gameOverText = this.add.text(400, 250, '', {
            fontSize: '48px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5).setVisible(false);
        
        this.restartText = this.add.text(400, 320, 'Натисніть R для перезапуску', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setVisible(false);
        
        // Клавіша для перезапуску
        this.restartKey = this.input.keyboard.addKey('R');
        
        console.log('=== CREATE ЗАВЕРШЕНО ===');
    }

    update() {
        if (this.gameOver) {
            // Перезапуск при натисканні R
            if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
                this.scene.restart();
            }
            return;
        }
        
        // Рух персонажа стрілками
        this.player.setVelocityX(0);
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }
        
        // Очки за уникнення об'єктів
        this.obstacles.children.entries.forEach(obstacle => {
            if (obstacle.y > 650) {
                obstacle.destroy();
                this.score += 1;
                this.scoreText.setText('Очки: ' + this.score);
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
        
        // Перевірка на завершення гри
        if (this.lives <= 0) {
            this.endGame();
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
