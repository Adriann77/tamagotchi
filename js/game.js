import Tamagotchi from './modules/tamagotchi.js';
import Abilities from './modules/abilities.js';

const allBtns = document.querySelectorAll('.eclipse');
const eatBtn = document.querySelector('.hunger');
const sleepBtn = document.querySelector('.sleep');
const playBtn = document.querySelector('.fun');

export default class Game {
	constructor() {
		this.tamagotchi = new Tamagotchi();
		this.abilities = new Abilities(eatBtn, sleepBtn, playBtn);
	}

	start = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.tamagotchi.mount({ healthElement, hungerElement, energyElement, funElement });
		this.abilities.show();

		allBtns.forEach(btn =>
			btn.addEventListener('click', () => {
				if (btn.classList.contains('hunger')) {
					this.tamagotchi.startFeeding();
				} else {
					this.tamagotchi.stopFeeding();
				}
			})
		);
		eatBtn.addEventListener('click', () => {});
	};
}
