// js/gameScene.js

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('starfield', 'assets/bg/starfield.png');
        this.load.image('player', 'assets/sprites/player.png');
        this.load.image('rock', 'assets/sprites/rock.png');
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 800, 600, 'starfield').setOrigin(0, 0);

        this.player = this.physics.add.sprite(400, 540, 'player').setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.rocks = this.physics.add.group();

        this.score = 0;
        this.scoreText = this.add.text(20, 20, 'Очки: 0', {
            fontFamily: 'Orbitron',
            fontSize: '24px',
            color: '#ffffff'
        });

        this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => {
                const x = Phaser.Math.Between(50, 750);
                const rock = this.rocks.create(x, -20, 'rock');
                rock.setVelocityY(150);
            }
        });

        this.physics.add.overlap(this.player, this.rocks, () => {
            this.scene.restart();
        });
    }

    update() {
        this.bg.tilePositionY -= 0.4;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(250);
        } else {
            this.player.setVelocityX(0);
        }

        this.rocks.getChildren().forEach(rock => {
            if (rock.y > 620) {
                rock.destroy();
                this.score += 1;
                this.scoreText.setText('Очки: ' + this.score);
            }
        });
    }
}
