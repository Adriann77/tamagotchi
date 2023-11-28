import Tamagotchi from './modules/tamagotchi.js';
import Abilities from './modules/abilities.js';

const eatBtn = document.querySelector('.hunger');
const sleepBtn = document.querySelector('.sleep');
const playBtn = document.querySelector('.fun');
const restartBtn = document.querySelector('.restart')

export default class Game {
	constructor() {
		this.tamagotchi = new Tamagotchi();
	}

	start = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.tamagotchi.mount({ healthElement, hungerElement, energyElement, funElement });
		eatBtn.addEventListener('click', () => {
			this.tamagotchi.setStateEating();
		});
		sleepBtn.addEventListener('click', () => {
			this.tamagotchi.setStateSleeping();
		});
		playBtn.addEventListener('click', () => {
			this.tamagotchi.setStatePlaying();
		});
		restartBtn.addEventListener('click', ()=>{
			this.tamagotchi.handleRestart();
			this.tamagotchi.mount({ healthElement, hungerElement, energyElement, funElement });

		})
	};
}
