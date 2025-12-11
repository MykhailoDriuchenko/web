const character = {
    name: "Pikachu",
    hp: 100,
    maxHp: 100,
    progressbar: document.getElementById("progressbar-character"),
    healthText: document.getElementById("health-character"),
    
    updateHp: function() {
        const percent = (this.hp / this.maxHp) * 100;
        this.progressbar.style.width = percent + "%";
        this.healthText.textContent = `${this.hp} / ${this.maxHp}`;

        if (percent > 50) {
            this.progressbar.className = "health";
        } else if (percent > 20) {
            this.progressbar.className = "health low";
        } else {
            this.progressbar.className = "health critical";
        }
    },
    
    attack: function(defender) {
        const damage = Math.floor(Math.random() * 20) + 5;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        console.log(`${this.name} атакує ${defender.name} і завдає ${damage} шкоди!`);
    },
    
    specialAttack: function(defender) {
        const damage = Math.floor(Math.random() * 30) + 10;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        console.log(`${this.name} використовує спеціальну атаку на ${defender.name} і завдає ${damage} шкоди!`);
    }
};

const enemy = {
    name: "Charmander",
    hp: 100,
    maxHp: 100,
    progressbar: document.getElementById("progressbar-enemy"),
    healthText: document.getElementById("health-enemy"),
    
    updateHp: function() {
        const percent = (this.hp / this.maxHp) * 100;
        this.progressbar.style.width = percent + "%";
        this.healthText.textContent = `${this.hp} / ${this.maxHp}`;

        if (percent > 50) {
            this.progressbar.className = "health";
        } else if (percent > 20) {
            this.progressbar.className = "health low";
        } else {
            this.progressbar.className = "health critical";
        }
    },
    
    attack: function(defender) {
        const damage = Math.floor(Math.random() * 20) + 5;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        console.log(`${this.name} атакує ${defender.name} і завдає ${damage} шкоди!`);
    },
    
    specialAttack: function(defender) {
        const damage = Math.floor(Math.random() * 30) + 10;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        console.log(`${this.name} використовує спеціальну атаку на ${defender.name} і завдає ${damage} шкоди!`);
    }
};

const bulbasaur = {
    name: "Bulbasaur",
    hp: 100,
    maxHp: 100,
    progressbar: null,
    healthText: null,
    
    updateHp: function() {
        const percent = (this.hp / this.maxHp) * 100;
        this.progressbar.style.width = percent + "%";
        this.healthText.textContent = `${this.hp} / ${this.maxHp}`;

        if (percent > 50) {
            this.progressbar.className = "health";
        } else if (percent > 20) {
            this.progressbar.className = "health low";
        } else {
            this.progressbar.className = "health critical";
        }
    },
    
    attack: function(defender) {
        const damage = Math.floor(Math.random() * 20) + 5;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        console.log(`${this.name} атакує ${defender.name} і завдає ${damage} шкоди!`);
    },
    
    specialAttack: function(defender) {
        const damage = Math.floor(Math.random() * 30) + 10;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        console.log(`${this.name} використовує спеціальну атаку на ${defender.name} і завдає ${damage} шкоди!`);
    }
};

const createProgressBar = function(name) {
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
};

function createHealthText(name) {
    return document.querySelectorAll(".pokemon.enemy .hp .text")[1];
}

bulbasaur.progressbar = createProgressBar("Bulbasaur");
bulbasaur.healthText = createHealthText("Bulbasaur");

const btnKick = document.getElementById("btn-kick");
const btnSpecial = document.createElement("button");
btnSpecial.classList.add("button");
btnSpecial.textContent = "Electro Shock";
document.querySelector(".control").appendChild(btnSpecial);

btnKick.addEventListener("click", () => {
    character.attack(enemy);
    character.attack(bulbasaur);
});

btnSpecial.addEventListener("click", () => {
    character.specialAttack(enemy);
    character.specialAttack(bulbasaur);
});

character.updateHp();
enemy.updateHp();
bulbasaur.updateHp();