const pikachu = {
    name: "Pikachu",
    hp: 100,
    maxHp: 100,
    progressbar: document.getElementById("progressbar-character"),
    healthText: document.getElementById("health-character")
};

const charmander = {
    name: "Charmander",
    hp: 100,
    maxHp: 100,
    progressbar: document.getElementById("progressbar-enemy"),
    healthText: document.getElementById("health-enemy")
};

const bulbasaur = {
    name: "Bulbasaur",
    hp: 100,
    maxHp: 100,
    progressbar: createProgressBar("Bulbasaur"),
    healthText: createHealthText("Bulbasaur")
};

function createProgressBar(name) {
    const container = document.createElement("div");
    container.classList.add("pokemon", "enemy");
    container.innerHTML = `
        <span class="lvl">Lv. 1</span>
        <img src="http://sify4321.000webhostapp.com/bulbasaur.png" class="sprite">
        <div class="details">
            <h2 class="name">${name}</h2>
            <div class="hp">
                <div class="bar">
                    <div class="health" style="width:100%;"></div>
                </div>
                <span class="text">100 / 100</span>
            </div>
        </div>
    `;
    document.querySelector(".playground").appendChild(container);
    return container.querySelector(".health");
}

function createHealthText(name) {
    return document.querySelectorAll(".pokemon.enemy .hp .text")[1];
}


function updateHp(pokemon) {
    const percent = (pokemon.hp / pokemon.maxHp) * 100;
    pokemon.progressbar.style.width = percent + "%";
    pokemon.healthText.textContent = `${pokemon.hp} / ${pokemon.maxHp}`;

    if (percent > 50) {
        pokemon.progressbar.className = "health";
    } else if (percent > 20) {
        pokemon.progressbar.className = "health low";
    } else {
        pokemon.progressbar.className = "health critical";
    }
}

function attack(attacker, defender) {
    const damage = Math.floor(Math.random() * 20) + 5;
    defender.hp -= damage;
    if (defender.hp < 0) defender.hp = 0;
    updateHp(defender);
    console.log(`${attacker.name} атакує ${defender.name} і завдає ${damage} шкоди!`);
}

function specialAttack(attacker, defender) {
    const damage = Math.floor(Math.random() * 30) + 10;
    defender.hp -= damage;
    if (defender.hp < 0) defender.hp = 0;
    updateHp(defender);
    console.log(`${attacker.name} використовує спеціальну атаку на ${defender.name} і завдає ${damage} шкоди!`);
}

const btnKick = document.getElementById("btn-kick");
const btnSpecial = document.createElement("button");
btnSpecial.classList.add("button");
btnSpecial.textContent = "Electro Shock";
document.querySelector(".control").appendChild(btnSpecial);

btnKick.addEventListener("click", () => {
    attack(pikachu, charmander);
    attack(pikachu, bulbasaur);
});

btnSpecial.addEventListener("click", () => {
    specialAttack(pikachu, charmander);
    specialAttack(pikachu, bulbasaur);
});


updateHp(pikachu);
updateHp(charmander);
updateHp(bulbasaur);
