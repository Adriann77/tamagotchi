import Tamagotchi from './modules/tamagotchi';

const eatBtn = document.querySelector('.hunger');
const sleepBtn = document.querySelector('.sleep');
const playBtn = document.querySelector('.fun');
const restartBtn = document.querySelector('.restart');

interface GameOptions {
	healthElement: string;
	hungerElement: string;
	energyElement: string;
	funElement: string;
}

export default class Game {
	private tamagotchi: Tamagotchi;
	constructor() {
		this.tamagotchi = new Tamagotchi();
	}

	start(options: GameOptions): void {
		this.tamagotchi.mount(options);

		eatBtn.addEventListener('click', () => {
			this.tamagotchi.setStateEating();
		});

		sleepBtn.addEventListener('click', () => {
			this.tamagotchi.setStateSleeping();
		});

		playBtn.addEventListener('click', () => {
			this.tamagotchi.setStatePlaying();
		});

		restartBtn.addEventListener('click', () => {
			this.tamagotchi.handleRestart();
			this.tamagotchi.mount(options);
		});
	}
}
