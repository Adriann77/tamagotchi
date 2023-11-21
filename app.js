import Game from './js/game.js';


document.addEventListener('DOMContentLoaded', () => {

	const game = new Game();


	// Start game
	game.start({
		healthElement: '.health__value',
		hungerElement: '.hunger__value',
		energyElement: '.sleep__value',
		funElement: '.fun__value',
	});


});


