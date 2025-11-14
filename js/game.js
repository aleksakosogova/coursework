/* ====== GAME LOGIC: Darkspace Escape ====== */

/* 
   Проста логіка для демонстрації.
   Персонаж зберігається у localStorage,
   а на game.html — запускається міні-сцена.
*/

// ====== ЗБЕРЕЖЕННЯ ПЕРСОНАЖА ======
function saveCharacter() {
    const name = document.getElementById("charName").value;
    const race = document.getElementById("charRace").value;
    const cls = document.getElementById("charClass").value;

    if (!name) {
        alert("Введи ім'я персонажа!");
        return;
    }

    const character = {
        name: name,
        race: race,
        class: cls
    };

    localStorage.setItem("darkCharacter", JSON.stringify(character));

    alert("Персонажа створено!");
    window.location.href = "game.html";
}


// ====== ВІДОБРАЖЕННЯ ПЕРСОНАЖА В ГРІ ======
function loadCharacter() {
    const stored = localStorage.getItem("darkCharacter");

    if (!stored) {
        document.getElementById("gameArea").innerHTML =
            "<p>Персонажа ще не створено.</p>";
        return;
    }

    const character = JSON.parse(stored);

    document.getElementById("charInfo").innerHTML = `
        <h2>${character.name}</h2>
        <p><strong>Раса:</strong> ${character.race}</p>
        <p><strong>Клас:</strong> ${character.class}</p>
    `;
}


// ====== ПРОСТЕ МІНІ-ЗАВДАННЯ ======
function startEncounter() {
    const messages = [
        "Ти бачиш миготливий фіолетовий портал...",
        "Темрява навколо рухається...",
        "Космос спостерігає за тобою...",
        "Ти чуєш глухий гул десь позаду..."
    ];

    const random = Math.floor(Math.random() * messages.length);

    document.getElementById("eventBox").innerHTML = `
        <p>${messages[random]}</p>
    `;
}
