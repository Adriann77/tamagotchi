import Tamagotchi from './tamagotchi.js';

export default class Abilities extends Tamagotchi {
	constructor(eatBtn, sleepBtn, playBtn) {
		super();
		this.eatBtn = eatBtn;
		this.sleepBtn = sleepBtn;
		this.playBtn = playBtn;

    this.tamagotchiInstance = new Tamagotchi()
	}

	show() {
 

    
	}
}
