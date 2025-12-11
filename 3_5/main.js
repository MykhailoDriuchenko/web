import { Game } from './modules/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            if (confirm('Скинути гру та почати заново?')) {
                game.resetGame();
            }
        });
    }

    window.game = game;
});