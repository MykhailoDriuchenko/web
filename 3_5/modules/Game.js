import { Pokemon } from './Pokemon.js';
import { createClickCounter, updateButtonText } from './ClickCounter.js';

export class Game {
    constructor() {
        this.character = new Pokemon("Pikachu", 100, "progressbar-character", "health-character", false);
        this.enemy = new Pokemon("Charmander", 100, "progressbar-enemy", "health-enemy", true);
        
        this.kickButtonCounter = createClickCounter();
        this.specialButtonCounter = createClickCounter();
        
        this.initUI();
        this.initEventListeners();
    }

    initUI() {
        if (!document.getElementById('logs')) {
            const logContainer = document.createElement('div');
            logContainer.id = 'logs';
            document.querySelector('.playground').after(logContainer);
        }

        this.btnKick = document.getElementById("btn-kick");
        this.originalKickText = this.btnKick.textContent;

        this.btnSpecial = document.createElement("button");
        this.btnSpecial.classList.add("button");
        this.originalSpecialText = "Electro Shock";
        this.btnSpecial.textContent = this.originalSpecialText;
        document.querySelector(".control").appendChild(this.btnSpecial);

        updateButtonText(this.btnKick, this.kickButtonCounter, this.originalKickText);
        updateButtonText(this.btnSpecial, this.specialButtonCounter, this.originalSpecialText);

        this.character.updateHp();
        this.enemy.updateHp();
    }

    initEventListeners() {
        this.btnKick.addEventListener("click", () => this.handleAttack(false));
        this.btnSpecial.addEventListener("click", () => this.handleAttack(true));
    }

    handleAttack(isSpecial) {
        const counter = isSpecial ? this.specialButtonCounter : this.kickButtonCounter;
        const button = isSpecial ? this.btnSpecial : this.btnKick;
        const originalText = isSpecial ? this.originalSpecialText : this.originalKickText;

        if (!counter.canClick()) {
            console.log(`Кнопка "${originalText}" більше не може бути натиснута!`);
            return;
        }

        const result = counter.increment();
        console.log(`Кнопка "${originalText}": натиснуто ${result.count} разів, залишилось ${result.remaining}`);
        
        updateButtonText(button, counter, originalText);

        if (isSpecial) {
            this.character.attack(this.enemy, true);
        } else {
            this.character.attack(this.enemy, false);
        }

        if (result.remaining === 0) {
            this.addLimitReachedLog(originalText);
        }

        if (!this.enemy.isAlive()) {
            this.addVictoryLog();
        }
    }

    addLimitReachedLog(buttonText) {
        const logElement = document.createElement('div');
        logElement.textContent = `Кнопка "${buttonText}" використала всі доступні натискання!`;
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
        if (logsContainer) {
            logsContainer.insertBefore(logElement, logsContainer.firstChild);
        }
    }

    addVictoryLog() {
        const logElement = document.createElement('div');
        logElement.textContent = `${this.character.name} переміг ${this.enemy.name}! Гра закінчена!`;
        logElement.style.cssText = `
            padding: 12px;
            margin: 8px 0;
            background: rgba(100, 255, 100, 0.9);
            border-radius: 5px;
            border-left: 4px solid #00ff00;
            font-weight: bold;
            color: #003300;
            font-size: 18px;
        `;
        const logsContainer = document.getElementById('logs');
        if (logsContainer) {
            logsContainer.insertBefore(logElement, logsContainer.firstChild);
        }
    }

    resetGame() {
        this.character.hp = 100;
        this.enemy.hp = 100;
        this.character.updateHp();
        this.enemy.updateHp();
        
        this.kickButtonCounter.reset();
        this.specialButtonCounter.reset();
        
        updateButtonText(this.btnKick, this.kickButtonCounter, this.originalKickText);
        updateButtonText(this.btnSpecial, this.specialButtonCounter, this.originalSpecialText);

        const logsContainer = document.getElementById('logs');
        if (logsContainer) {
            logsContainer.innerHTML = '';
        }
    }
}