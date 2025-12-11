const logs = [
    '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
    '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
    '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
    '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
    '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком \<вырезанно цензурой\> противника.',
    '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
    '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
    '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
    '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
    '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

const logContainer = document.createElement('div');
logContainer.id = 'logs';
document.querySelector('.playground').after(logContainer);

const createClickCounter = (maxClicks = 5) => {
    let clickCount = 0;
    
    return {
        increment: () => {
            if (clickCount < maxClicks) {
                clickCount++;
                return {
                    count: clickCount,
                    remaining: maxClicks - clickCount,
                    canClick: clickCount < maxClicks
                };
            }
            return {
                count: clickCount,
                remaining: 0,
                canClick: false
            };
        },
        getCount: () => clickCount,
        getRemaining: () => maxClicks - clickCount,
        canClick: () => clickCount < maxClicks,
        reset: () => {
            clickCount = 0;
        }
    };
};

const kickButtonCounter = createClickCounter();
const specialButtonCounter = createClickCounter();

const character = {
    name: "Pikachu",
    hp: 100,
    maxHp: 100,
    progressbar: document.getElementById("progressbar-character"),
    healthText: document.getElementById("health-character"),
    
    updateHp: function() {
        const { hp, maxHp, progressbar, healthText } = this;
        const percent = (hp / maxHp) * 100;
        progressbar.style.width = percent + "%";
        healthText.textContent = `${hp} / ${maxHp}`;

        if (percent > 50) {
            progressbar.className = "health";
        } else if (percent > 20) {
            progressbar.className = "health low";
        } else {
            progressbar.className = "health critical";
        }
    },
    
    attack: function(defender) {
        const damage = Math.floor(Math.random() * 20) + 5;
        const { name: attackerName } = this;
        const { name: defenderName, hp: defenderHpBefore } = defender;
        
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        
        const logMessage = this.generateLog(attackerName, defenderName, damage, defenderHpBefore, defender.hp);
        this.addLog(logMessage);
        
        console.log(`${attackerName} атакує ${defenderName} і завдає ${damage} шкоди!`);
    },
    
    specialAttack: function(defender) {
        const damage = Math.floor(Math.random() * 30) + 10;
        const { name: attackerName } = this;
        const { name: defenderName, hp: defenderHpBefore } = defender;
        
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        
        const logMessage = this.generateLog(attackerName, defenderName, damage, defenderHpBefore, defender.hp, true);
        this.addLog(logMessage);
        
        console.log(`${attackerName} використовує спеціальну атаку на ${defenderName} і завдає ${damage} шкоди!`);
    },
    
    generateLog: function(attacker, defender, damage, hpBefore, hpAfter, isSpecial = false) {
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        const attackType = isSpecial ? "СПЕЦІАЛЬНУ АТАКУ" : "АТАКУ";
        
        let log = randomLog;
        log = log.replace('[ПЕРСОНАЖ №1]', defender);
        log = log.replace('[ПЕРСОНАЖ №2]', attacker);
        
        return `${new Date().toLocaleTimeString()} - ${log}. ${attackType}: -${damage} HP. ${defender}: ${hpBefore} HP → ${hpAfter} HP`;
    },
    
    addLog: function(message) {
        const logElement = document.createElement('div');
        logElement.textContent = message;
        logElement.style.cssText = `
            padding: 8px;
            margin: 4px 0;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
            border-left: 4px solid #ffc55b;
        `;
        const logsContainer = document.getElementById('logs');
        logsContainer.insertBefore(logElement, logsContainer.firstChild);
    }
};

const enemy = {
    name: "Charmander",
    hp: 100,
    maxHp: 100,
    progressbar: document.getElementById("progressbar-enemy"),
    healthText: document.getElementById("health-enemy"),
    
    updateHp: function() {
        const { hp, maxHp, progressbar, healthText } = this;
        const percent = (hp / maxHp) * 100;
        progressbar.style.width = percent + "%";
        healthText.textContent = `${hp} / ${maxHp}`;

        if (percent > 50) {
            progressbar.className = "health";
        } else if (percent > 20) {
            progressbar.className = "health low";
        } else {
            progressbar.className = "health critical";
        }
    },
    
    attack: function(defender) {
        const damage = Math.floor(Math.random() * 20) + 5;
        const { name: attackerName } = this;
        const { name: defenderName, hp: defenderHpBefore } = defender;
        
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        
        const logMessage = this.generateLog(attackerName, defenderName, damage, defenderHpBefore, defender.hp);
        this.addLog(logMessage);
        
        console.log(`${attackerName} атакує ${defenderName} і завдає ${damage} шкоди!`);
    },
    
    specialAttack: function(defender) {
        const damage = Math.floor(Math.random() * 30) + 10;
        const { name: attackerName } = this;
        const { name: defenderName, hp: defenderHpBefore } = defender;
        
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        
        const logMessage = this.generateLog(attackerName, defenderName, damage, defenderHpBefore, defender.hp, true);
        this.addLog(logMessage);
        
        console.log(`${attackerName} використовує спеціальну атаку на ${defenderName} і завдає ${damage} шкоди!`);
    },
    
    generateLog: function(attacker, defender, damage, hpBefore, hpAfter, isSpecial = false) {
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        const attackType = isSpecial ? "СПЕЦІАЛЬНУ АТАКУ" : "АТАКУ";
        
        const log = randomLog
            .replace('[ПЕРСОНАЖ №1]', attacker)
            .replace('[ПЕРСОНАЖ №2]', defender)
        
        return `${new Date().toLocaleTimeString()} - ${log}. ${attackType}: -${damage} HP. ${defender}: ${hpBefore} HP → ${hpAfter} HP`;
    },
    
    addLog: function(message) {
        const logElement = document.createElement('div');
        logElement.textContent = message;
        logElement.style.cssText = `
            padding: 8px;
            margin: 4px 0;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
            border-left: 4px solid #ff5b5b;
        `;
        const logsContainer = document.getElementById('logs');
        logsContainer.insertBefore(logElement, logsContainer.firstChild);
    }
};

const updateButtonText = (button, counter, originalText) => {
    const remaining = counter.getRemaining();
    if (remaining > 0) {
        button.textContent = `${originalText} (${remaining} залишилось)`;
    } else {
        button.textContent = `${originalText} (0 залишилось)`;
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
    }
};

const btnKick = document.getElementById("btn-kick");
const originalKickText = btnKick.textContent;

const btnSpecial = document.createElement("button");
btnSpecial.classList.add("button");
const originalSpecialText = "Electro Shock";
btnSpecial.textContent = originalSpecialText;
document.querySelector(".control").appendChild(btnSpecial);

updateButtonText(btnKick, kickButtonCounter, originalKickText);
updateButtonText(btnSpecial, specialButtonCounter, originalSpecialText);

btnKick.addEventListener("click", () => {
    if (kickButtonCounter.canClick()) {
        const result = kickButtonCounter.increment();
        console.log(`Кнопка "${originalKickText}": натиснуто ${result.count} разів, залишилось ${result.remaining}`);
        
        updateButtonText(btnKick, kickButtonCounter, originalKickText);
        character.attack(enemy);

        if (result.remaining === 0) {
            const logElement = document.createElement('div');
            logElement.textContent = `Кнопка "${originalKickText}" використала всі доступні натискання!`;
            logElement.style.cssText = `
                padding: 8px;
                margin: 4px 0;
                background: rgba(255, 100, 100, 0.9);
                border-radius: 5px;
                border-left: 4px solid #ff0000;
                font-weight: bold;
                color: white;
            `;
            const logsContainer = document.getElementById('logs');
            logsContainer.insertBefore(logElement, logsContainer.firstChild);
        }
    } else {
        console.log(`Кнопка "${originalKickText}" більше не може бути натиснута!`);
    }
});

btnSpecial.addEventListener("click", () => {
    if (specialButtonCounter.canClick()) {
        const result = specialButtonCounter.increment();
        console.log(`Кнопка "${originalSpecialText}": натиснуто ${result.count} разів, залишилось ${result.remaining}`);
        
        updateButtonText(btnSpecial, specialButtonCounter, originalSpecialText);
        character.specialAttack(enemy);

        if (result.remaining === 0) {
            const logElement = document.createElement('div');
            logElement.textContent = `Кнопка "${originalSpecialText}" використала всі доступні натискання!`;
            logElement.style.cssText = `
                padding: 8px;
                margin: 4px 0;
                background: rgba(255, 100, 100, 0.9);
                border-radius: 5px;
                border-left: 4px solid #ff0000;
                font-weight: bold;
                color: white;
            `;
            const logsContainer = document.getElementById('logs');
            logsContainer.insertBefore(logElement, logsContainer.firstChild);
        }
    } else {
        console.log(`Кнопка "${originalSpecialText}" більше не може бути натиснута!`);
    }
});

character.updateHp();
enemy.updateHp();