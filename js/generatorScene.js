// js/generatorScene.js

const canvas = document.getElementById('characterCanvas');
const ctx = canvas.getContext('2d');

let settings = {
    body: '#a66cff',
    head: '#c77dff',
    eyes: '#ffffff',
    outfit: '#5a189a'
};

function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = settings.body;
    ctx.fillRect(90, 120, 120, 160);

    ctx.fillStyle = settings.head;
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = settings.eyes;
    ctx.fillRect(130, 90, 15, 10);
    ctx.fillRect(155, 90, 15, 10);

    ctx.fillStyle = settings.outfit;
    ctx.fillRect(90, 200, 120, 60);
}

drawCharacter();

export function updateSetting(type, value) {
    settings[type] = value;
    drawCharacter();
}

export function saveCharacter() {
    localStorage.setItem('character', JSON.stringify(settings));
}
