// js/config.js

import MainMenu from './mainMenu.js';
import GameScene from './gameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, GameScene]
};

export default config;
