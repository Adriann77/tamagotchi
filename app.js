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


export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };
	}
}