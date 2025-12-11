import { LOGS } from './constants.js';

export class Pokemon {
    constructor(name, hp, progressbarId, healthTextId, isEnemy = false) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.progressbar = document.getElementById(progressbarId);
        this.healthText = document.getElementById(healthTextId);
        this.isEnemy = isEnemy;
        this.logColor = isEnemy ? '#ff5b5b' : '#ffc55b';
    }

    updateHp() {
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
    }

    attack(defender, isSpecial = false) {
        const damage = isSpecial 
            ? Math.floor(Math.random() * 30) + 10
            : Math.floor(Math.random() * 20) + 5;
            
        const { name: attackerName } = this;
        const { name: defenderName, hp: defenderHpBefore } = defender;
        
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        defender.updateHp();
        
        const logMessage = this.generateLog(attackerName, defenderName, damage, defenderHpBefore, defender.hp, isSpecial);
        this.addLog(logMessage);
        
        console.log(`${attackerName} ${isSpecial ? 'спеціально атакує' : 'атакує'} ${defenderName} і завдає ${damage} шкоди!`);
        
        return damage;
    }

    generateLog(attacker, defender, damage, hpBefore, hpAfter, isSpecial = false) {
        const randomLog = LOGS[Math.floor(Math.random() * LOGS.length)];
        const attackType = isSpecial ? "СПЕЦІАЛЬНУ АТАКУ" : "АТАКУ";
        
        let log = randomLog;
        if (this.isEnemy) {
            log = log
                .replace('[ПЕРСОНАЖ №1]', attacker)
                .replace('[ПЕРСОНАЖ №2]', defender);
        } else {
            log = log
                .replace('[ПЕРСОНАЖ №1]', defender)
                .replace('[ПЕРСОНАЖ №2]', attacker);
        }
        
        return `${new Date().toLocaleTimeString()} - ${log}. ${attackType}: -${damage} HP. ${defender}: ${hpBefore} HP → ${hpAfter} HP`;
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
}