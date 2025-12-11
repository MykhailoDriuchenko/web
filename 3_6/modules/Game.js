import { Pokemon } from './Pokemon.js';
import { pokemons } from './pokemons.js';

export class Game {
    constructor() {
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = null;
        this.isGameStarted = false;
        this.gameOver = false;
        this.isSelectingPokemon = false;
        this.turnCounter = 0;
        
        this.initUI();
    }

    initUI() {
        if (!document.getElementById('logs')) {
            const logContainer = document.createElement('div');
            logContainer.id = 'logs';
            document.querySelector('.playground').after(logContainer);
        }
        
        this.clearOldButtons();
        this.createControlButtons();
        
        document.getElementById('name-character').textContent = 'Player 1';
        document.getElementById('name-enemy').textContent = 'Player 2';
    }

    clearOldButtons() {
        const oldButtons = document.querySelectorAll('.control .button');
        oldButtons.forEach(button => button.remove());
    }

    createControlButtons() {
        const controlDiv = document.querySelector('.control');
        
        this.startButton = document.createElement('button');
        this.startButton.classList.add('button');
        this.startButton.id = 'btn-start';
        this.startButton.textContent = 'START GAME (Select Pokemons)';
        this.startButton.addEventListener('click', () => this.startGame());
        
        this.resetButton = document.createElement('button');
        this.resetButton.classList.add('button');
        this.resetButton.id = 'btn-reset';
        this.resetButton.textContent = 'RESET GAME';
        this.resetButton.addEventListener('click', () => this.resetGame());
        
        controlDiv.appendChild(this.startButton);
        controlDiv.appendChild(this.resetButton);
    }

    startGame() {
        if (this.isGameStarted && !this.gameOver) {
            if (!confirm('Игра уже идет. Начать новую игру?')) {
                return;
            }
        }
        
        this.isSelectingPokemon = true;
        this.showPokemonSelection();
    }

    showPokemonSelection() {
        const controlDiv = document.querySelector('.control');
        controlDiv.innerHTML = '';
        
        const title = document.createElement('h3');
        title.textContent = 'Player 1: Select your Pokemon';
        title.style.color = '#ffc55b';
        title.style.marginBottom = '20px';
        controlDiv.appendChild(title);

        const pokemonButtonsContainer = document.createElement('div');
        pokemonButtonsContainer.style.display = 'flex';
        pokemonButtonsContainer.style.flexWrap = 'wrap';
        pokemonButtonsContainer.style.justifyContent = 'center';
        pokemonButtonsContainer.style.gap = '10px';
        pokemonButtonsContainer.style.marginBottom = '20px';
        
        pokemons.forEach((pokemon, index) => {
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = pokemon.name;
            button.style.flex = '1 0 auto';
            button.style.minWidth = '120px';
            
            button.addEventListener('click', () => {
                this.selectPokemonForPlayer1(pokemon, index);
            });
            
            pokemonButtonsContainer.appendChild(button);
        });
        
        controlDiv.appendChild(pokemonButtonsContainer);
    }

    selectPokemonForPlayer1(pokemon, index) {
        this.player1 = new Pokemon(
            pokemon, 
            "progressbar-character", 
            "health-character", 
            false
        );
        
        this.player1.updateUI();
        this.showPokemonSelectionForPlayer2(index);
    }

    showPokemonSelectionForPlayer2(excludedIndex) {
        const controlDiv = document.querySelector('.control');
        controlDiv.innerHTML = '';
        
        const title = document.createElement('h3');
        title.textContent = 'Player 2: Select your Pokemon';
        title.style.color = '#ff5b5b';
        title.style.marginBottom = '20px';
        controlDiv.appendChild(title);

        const pokemonButtonsContainer = document.createElement('div');
        pokemonButtonsContainer.style.display = 'flex';
        pokemonButtonsContainer.style.flexWrap = 'wrap';
        pokemonButtonsContainer.style.justifyContent = 'center';
        pokemonButtonsContainer.style.gap = '10px';
        pokemonButtonsContainer.style.marginBottom = '20px';
        
        pokemons.forEach((pokemon, index) => {
            if (index === excludedIndex) return;
            
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = pokemon.name;
            button.style.flex = '1 0 auto';
            button.style.minWidth = '120px';
            
            button.addEventListener('click', () => {
                this.selectPokemonForPlayer2(pokemon);
            });
            
            pokemonButtonsContainer.appendChild(button);
        });
        
        controlDiv.appendChild(pokemonButtonsContainer);
    }

    selectPokemonForPlayer2(pokemon) {
        this.player2 = new Pokemon(
            pokemon, 
            "progressbar-enemy", 
            "health-enemy", 
            true
        );
        
        this.player2.updateUI();
        this.startBattle();
    }

    startBattle() {
        this.isGameStarted = true;
        this.gameOver = false;
        this.isSelectingPokemon = false;
        this.turnCounter = 0;
        
        this.currentPlayer = Math.random() > 0.5 ? this.player1 : this.player2;
        
        this.createBattleInterface();
        
        const startingPlayer = this.currentPlayer === this.player1 ? 'Player 1' : 'Player 2';
        this.addLog(`🎮 Битва начинается! ${this.player1.name} (Player 1) против ${this.player2.name} (Player 2)!`, '#ffc55b');
        this.addLog(`🎲 ${startingPlayer} ходит первым!`, '#00a3e2');
        this.addLog(`Ход №${++this.turnCounter}: ${startingPlayer}`, '#4a90e2');
        
        this.updateAttackButtons();
    }

    createBattleInterface() {
        const controlDiv = document.querySelector('.control');
        controlDiv.innerHTML = '';

        const attacksContainer = document.createElement('div');
        attacksContainer.id = 'attacks-container';
        attacksContainer.style.display = 'flex';
        attacksContainer.style.flexDirection = 'column';
        attacksContainer.style.alignItems = 'center';
        attacksContainer.style.gap = '10px';
        attacksContainer.style.width = '100%';

        const infoPanel = document.createElement('div');
        infoPanel.id = 'turn-info';
        infoPanel.style.margin = '10px 0';
        infoPanel.style.padding = '10px';
        infoPanel.style.background = this.currentPlayer === this.player1 ? 'rgba(255, 197, 91, 0.2)' : 'rgba(255, 91, 91, 0.2)';
        infoPanel.style.borderRadius = '5px';
        infoPanel.style.border = `2px solid ${this.currentPlayer === this.player1 ? '#ffc55b' : '#ff5b5b'}`;
        infoPanel.style.textAlign = 'center';
        infoPanel.style.width = '100%';
        
        const turnText = document.createElement('p');
        turnText.textContent = `Ход №${this.turnCounter}: ${this.currentPlayer === this.player1 ? 'Player 1' : 'Player 2'} (${this.currentPlayer.name})`;
        turnText.style.fontWeight = 'bold';
        turnText.style.margin = '0';
        turnText.style.fontSize = '18px';
        
        infoPanel.appendChild(turnText);
        controlDiv.appendChild(infoPanel);

        this.createAttackButtonsForCurrentPlayer(attacksContainer);

        controlDiv.appendChild(attacksContainer);
    }

    createAttackButtonsForCurrentPlayer(container) {
        const availableAttacks = this.currentPlayer.getAvailableAttacks();
        
        if (availableAttacks.length === 0) {
            const noAttacksMsg = document.createElement('p');
            noAttacksMsg.textContent = 'Нет доступных атак!';
            noAttacksMsg.style.color = '#ff0000';
            noAttacksMsg.style.fontWeight = 'bold';
            noAttacksMsg.style.textAlign = 'center';
            container.appendChild(noAttacksMsg);
            return;
        }

        const attacksTitle = document.createElement('h4');
        attacksTitle.textContent = 'Выберите атаку:';
        attacksTitle.style.color = this.currentPlayer === this.player1 ? '#ffc55b' : '#ff5b5b';
        attacksTitle.style.margin = '10px 0';
        attacksTitle.style.textAlign = 'center';
        container.appendChild(attacksTitle);
        
        availableAttacks.forEach(attack => {
            const button = document.createElement('button');
            button.classList.add('button', 'attack-button');
            
            const usedCount = this.currentPlayer.attacksUsed[attack.name] || 0;
            const remaining = attack.maxCount - usedCount;
            
            button.textContent = `${attack.name} (${remaining}/${attack.maxCount})`;
            button.dataset.attack = attack.name;

            button.style.width = '220px';
            button.style.padding = '12px';
            button.style.margin = '5px 0';
            button.style.fontSize = '16px';
            button.style.display = 'block';
            
            button.disabled = this.gameOver;
            
            button.addEventListener('click', () => {
                this.handleAttack(attack.name);
            });

            button.addEventListener('mouseenter', () => {
                if (!button.disabled) {
                    button.style.transform = 'translateY(-2px)';
                    button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
            
            container.appendChild(button);
        });
    }

    handleAttack(attackName) {
        if (this.gameOver || !this.currentPlayer.canUseAttack(attackName)) {
            return;
        }
        
        const attacker = this.currentPlayer;
        const defender = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        
        const defenderHpBefore = defender.hp;
        
        const damage = attacker.attack(defender, attackName);
        
        if (damage > 0) {
            if (!defender.isAlive()) {
                this.endGame(attacker, defender);
                return;
            }
            
            this.switchTurn();
        }
    }

    switchTurn() {
        this.addLog('--- Смена хода ---', '#888');
        
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        
        this.createBattleInterface();
        
        const playerName = this.currentPlayer === this.player1 ? 'Player 1' : 'Player 2';
        this.addLog(`Ход №${++this.turnCounter}: ${playerName} (${this.currentPlayer.name})`, '#4a90e2');
    }

    endGame(winner, loser) {
        this.gameOver = true;
        
        const winnerIsPlayer1 = winner === this.player1;
        
        this.addLog('='.repeat(50), '#ffc55b');
        this.addLog(`🎉 ПОБЕДА! ${winner.name} (${winnerIsPlayer1 ? 'Player 1' : 'Player 2'}) побеждает!`, '#00ff00');
        this.addLog(`💀 ${loser.name} повержен!`, '#ff0000');
        this.addLog(`📊 Всего ходов: ${this.turnCounter}`, '#ffc55b');
        this.addLog('='.repeat(50), '#ffc55b');
        this.addLog('Нажмите RESET GAME для новой игры', '#ffc55b');

        const attackButtons = document.querySelectorAll('.attack-button');
        attackButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            button.style.transform = 'none';
            button.style.boxShadow = 'none';
        });
        
        this.showVictoryMessage(winner, winnerIsPlayer1);
    }

    showVictoryMessage(winner, isPlayer1) {
        const controlDiv = document.querySelector('.control');
        controlDiv.innerHTML = '';
        
        const victoryDiv = document.createElement('div');
        victoryDiv.style.textAlign = 'center';
        victoryDiv.style.padding = '20px';
        victoryDiv.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e)';
        victoryDiv.style.borderRadius = '10px';
        victoryDiv.style.border = '3px solid gold';
        victoryDiv.style.width = '100%';
        
        const victoryText = document.createElement('h2');
        victoryText.textContent = `🏆 ПОБЕДА! 🏆`;
        victoryText.style.color = '#ff0000';
        victoryText.style.marginBottom = '10px';
        
        const winnerText = document.createElement('h3');
        winnerText.textContent = `${winner.name} (${isPlayer1 ? 'Player 1' : 'Player 2'}) побеждает!`;
        winnerText.style.color = '#0055ff';
        winnerText.style.marginBottom = '15px';
        
        const statsText = document.createElement('p');
        statsText.textContent = `Всего ходов: ${this.turnCounter}`;
        statsText.style.fontWeight = 'bold';
        statsText.style.fontSize = '18px';
        
        const resetButton = document.createElement('button');
        resetButton.classList.add('button');
        resetButton.textContent = 'RESET GAME';
        resetButton.style.marginTop = '20px';
        resetButton.style.padding = '12px 24px';
        resetButton.style.fontSize = '18px';
        resetButton.addEventListener('click', () => this.resetGame());
        
        victoryDiv.appendChild(victoryText);
        victoryDiv.appendChild(winnerText);
        victoryDiv.appendChild(statsText);
        victoryDiv.appendChild(resetButton);
        controlDiv.appendChild(victoryDiv);
    }

    resetGame() {
        if (this.isGameStarted && !confirm('Начать новую игру? Текущий прогресс будет потерян.')) {
            return;
        }
        
        this.isGameStarted = false;
        this.gameOver = false;
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = null;
        this.turnCounter = 0;
        
        const logsContainer = document.getElementById('logs');
        if (logsContainer) {
            logsContainer.innerHTML = '';
        }
        
        this.resetUI();
        this.clearOldButtons();
        this.createControlButtons();
        
        document.getElementById('name-character').textContent = 'Player 1';
        document.getElementById('name-enemy').textContent = 'Player 2';
        
        document.getElementById('progressbar-character').style.width = '100%';
        document.getElementById('progressbar-enemy').style.width = '100%';
        document.getElementById('health-character').textContent = '100 / 100';
        document.getElementById('health-enemy').textContent = '100 / 100';
        
        document.querySelector('.character .sprite').src = './assets/pikachu.png';
        document.querySelector('.enemy .sprite').src = './assets/charmander.png';
    }

    resetUI() {
        const progressbar1 = document.getElementById('progressbar-character');
        const progressbar2 = document.getElementById('progressbar-enemy');
        
        progressbar1.style.width = '100%';
        progressbar2.style.width = '100%';
        progressbar1.classList.remove('low', 'critical');
        progressbar2.classList.remove('low', 'critical');
    }

    addLog(message, color = '#333') {
        const logElement = document.createElement('div');
        logElement.textContent = message;
        logElement.style.cssText = `
            padding: 8px;
            margin: 4px 0;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 5px;
            border-left: 4px solid ${color};
            font-weight: bold;
        `;
        const logsContainer = document.getElementById('logs');
        if (logsContainer) {
            logsContainer.insertBefore(logElement, logsContainer.firstChild);
        }
    }
}