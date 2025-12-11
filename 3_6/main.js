import { Game } from './modules/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            if (confirm('Сбросить игру и начать заново?')) {
                game.resetGame();
            }
        });
    }
    
    window.game = game;
});