import { LOGS } from './constants.js';

export class Pokemon {
    constructor(data, progressbarId, healthTextId, isPlayer2 = false) {
        this.name = data.name;
        this.type = data.type;
        this.hp = data.hp;
        this.maxHp = data.hp;
        this.img = data.img;
        this.attacks = [...data.attacks];
        this.progressbar = document.getElementById(progressbarId);
        this.healthText = document.getElementById(healthTextId);
        this.isPlayer2 = isPlayer2;
        this.logColor = isPlayer2 ? '#ff5b5b' : '#ffc55b';
        
        this.attacksUsed = {};
        this.attacks.forEach(attack => {
            this.attacksUsed[attack.name] = 0;
        });
    }

    updateUI() {
        const sprite = this.isPlayer2 
            ? document.querySelector('.enemy .sprite')
            : document.querySelector('.character .sprite');
        sprite.src = this.img;
        
        const nameElement = this.isPlayer2
            ? document.getElementById('name-enemy')
            : document.getElementById('name-character');
        nameElement.textContent = this.name;
        
        this.updateHp();
    }

    updateHp() {
        const { hp, maxHp, progressbar, healthText } = this;
        const percent = (hp / maxHp) * 100;
        progressbar.style.width = percent + "%";
        healthText.textContent = `${hp} / ${maxHp}`;

        progressbar.classList.remove('low', 'critical');
        if (percent <= 60 && percent > 20) {
            progressbar.classList.add('low');
        } else if (percent <= 20) {
            progressbar.classList.add('critical');
        }
    }

    canUseAttack(attackName) {
        const attack = this.attacks.find(a => a.name === attackName);
        if (!attack) return false;
        return this.attacksUsed[attackName] < attack.maxCount;
    }

    getAvailableAttacks() {
        return this.attacks.filter(attack => 
            this.attacksUsed[attack.name] < attack.maxCount
        );
    }

    attack(defender, attackName) {
        const attack = this.attacks.find(a => a.name === attackName);
        if (!attack || !this.canUseAttack(attackName)) {
            return 0;
        }

        this.attacksUsed[attackName]++;
        
        const damage = Math.floor(
            Math.random() * (attack.maxDamage - attack.minDamage + 1)
        ) + attack.minDamage;
        
        const { name: attackerName } = this;
        const { name: defenderName, hp: defenderHpBefore } = defender;
        
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        const logMessage = this.generateLog(
            attackerName, 
            defenderName, 
            damage, 
            defenderHpBefore, 
            defender.hp, 
            attackName,
            true
        );
        this.addLog(logMessage);
        
        console.log(`${attackerName} использует ${attackName} и наносит ${damage} урона!`);
        
        return damage;
    }

    generateLog(attacker, defender, damage, hpBefore, hpAfter, attackName, whoIsAttacker = true) {
        const randomLog = LOGS[Math.floor(Math.random() * LOGS.length)];

        let log;
        if (whoIsAttacker) {
            log = randomLog
                .replace('[ПЕРСОНАЖ №1]', defender)
                .replace('[ПЕРСОНАЖ №2]', attacker);
        } else {
            log = randomLog
                .replace('[ПЕРСОНАЖ №1]', attacker)
                .replace('[ПЕРСОНАЖ №2]', defender);
        }
        
        return `${new Date().toLocaleTimeString()} - ${log}. ${attackName.toUpperCase()}: -${damage} HP. ${defender}: ${hpBefore} HP → ${hpAfter} HP`;
    }

    addLog(message) {
        const logElement = document.createElement('div');
        logElement.textContent = message;
        logElement.style.cssText = `
            padding: 8px;
            margin: 4px 0;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
            border-left: 4px solid ${this.logColor};
        `;
        const logsContainer = document.getElementById('logs');
        if (logsContainer) {
            logsContainer.insertBefore(logElement, logsContainer.firstChild);
        }
    }

    isAlive() {
        return this.hp > 0;
    }

    resetAttackCounters() {
        Object.keys(this.attacksUsed).forEach(key => {
            this.attacksUsed[key] = 0;
        });
    }
}