import Tamagotchi from './modules/tamagotchi.js';
import Abilities from './modules/abilities.js';

const allBtns = document.querySelectorAll('.eclipse');
const eatBtn = document.querySelector('.hunger');
const sleepBtn = document.querySelector('.sleep');
const playBtn = document.querySelector('.fun');

export default class Game {
	constructor() {
		this.tamagotchi = new Tamagotchi();
	}

	start = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.tamagotchi.mount({ healthElement, hungerElement, energyElement, funElement });

		allBtns.forEach(btn =>
			btn.addEventListener('click', (e) => {
				this.tamagotchi.checkBtn(e.target)
			})
		);
		eatBtn.addEventListener('click', () => {});
	};
}
