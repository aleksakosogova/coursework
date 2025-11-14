// js/mainMenu.js

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('starfield', 'assets/bg/starfield.png');
    }

    create() {
        this.add.tileSprite(0, 0, 800, 600, 'starfield')
            .setOrigin(0, 0);

        const title = this.add.text(400, 180, 'Darkspace Escape', {
            fontFamily: 'Orbitron',
            fontSize: '48px',
            color: '#c77dff',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.createButton(400, 300, 'Почати гру', () => {
            this.scene.start('GameScene');
        });

        this.createButton(400, 360, 'Створити персонажа', () => {
            window.location.href = 'generator.html';
        });

        this.createButton(400, 420, 'Вихід', () => {
            window.close();
        });
    }

    createButton(x, y, text, callback) {
        const btn = this.add.text(x, y, text, {
            fontFamily: 'Orbitron',
            fontSize: '26px',
            color: '#ffffff',
            backgroundColor: '#5a189a',
            padding: { x: 20, y: 12 }
        }).setOrigin(0.5).setInteractive();

        btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#7b2cbf' }));
        btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#5a189a' }));
        btn.on('pointerdown', callback);
    }
}
