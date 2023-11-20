import Game from './js/game.js';
import TamagotchiStates from './js/modules/tamagotchiStates.js';

document.addEventListener('DOMContentLoaded', () => {
	const currentState = document.querySelector('.rectangle')
	const game = new Game();
	const tamaStates = new TamagotchiStates(currentState);

	// Start game
	game.start({
		healthElement: '.health__value',
		hungerElement: '.hunger__value',
		energyElement: '.sleep__value',
		funElement: '.fun__value',
	});

	tamaStates.getCurrentStatus();
});
