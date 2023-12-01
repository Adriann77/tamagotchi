const energyDecreaseRate = 0.5;

interface TamagotchiValues {
	value: number;
	importance: number;
}

interface TamagotchiState {
	happy: string;
	hungry: string;
	sad: string;
	sleepy: string;
	eating: string;
	sleeping: string;
	playing: string;
	dead: string;
}

export default class Tamagotchi {
	private state: keyof TamagotchiState;
	private health: TamagotchiValues;
	private hunger: TamagotchiValues;
	private energy: TamagotchiValues;
	private fun: TamagotchiValues;
	private setParametersInterval: NodeJS.Timeout;
	private setEnergyInterval: NodeJS.Timeout;

	constructor() {
		this.state = 'happy';
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };

		this.setParametersInterval = setInterval(() => {
			if (this.state !== 'eating' && this.state !== 'sleeping' && this.state !== 'playing' && this.state !== 'dead') {
				this.decreaseFun('.fun__value');
				this.decreaseHunger('.hunger__value');
				this.decreaseHealth('.health__value');
				this.displayStateinUI();
				this.checkStateChange();
			} else if (this.state === 'eating') {
				this.increaseHunger('.hunger__value');
			} else if (this.state === 'sleeping') {
				this.increaseEnergy('.sleep__value');
			} else if (this.state === 'playing') {
				this.increaseFun('.fun__value', '.sleep__value');
			}
		}, 1000);

		this.setEnergyInterval = setInterval(() => {
			if (this.state !== 'eating' && this.state !== 'sleeping' && this.state !== 'playing' && this.state !== 'dead') {
				this.decreaseEnergy('.sleep__value');
			}
		}, 2000);
	}

	private increaseHunger(elementSelector: string): void {
		if (this.hunger.value < 9) {
			this.hunger.value += 2;
		} else if (this.hunger.value === 9) {
			this.hunger.value++;
		}
		this.displayHunger(elementSelector);
	}

	private increaseEnergy(elementSelector: string): void {
		if (this.energy.value < 9) {
			this.energy.value += 2;
		} else if (this.energy.value === 9) {
			this.energy.value++;
		}
		this.displayEnergy(elementSelector);
	}

	private increaseFun(elementSelector: string, energyElement: string): void {
		if (this.fun.value < 10) {
			if (this.fun.value === 9) {
				this.fun.value++;
			} else {
				this.fun.value += 2;
			}
			this.energy.value--;
			if (this.energy.value < 0) {
				this.energy.value = 0;
			}
		}
		this.displayEnergy(energyElement);
		this.displayFun(elementSelector);
	}

	setState(state: keyof TamagotchiState): void {
		this.state = state;
	}

	checkStateChange(): void {
		this.checkIfHappy();
		this.checkIfSad();
		this.checkIfHungry();
		this.checkIfSleepy();
		this.checkIfDying();
	}

	private checkIfDying(): void {
		if (this.health.value <= 0) {
			this.setState('dead');
			this.displayStateinUI();
			const actionBtns = document.querySelector('.action-btns') as HTMLElement;
			const restartBtn = document.querySelector('.restart') as HTMLElement;
			actionBtns.style.display = 'none';
			restartBtn.style.display = 'block';
		}
	}

	private checkIfHappy(): void {
		if (this.health.value >= 7 && this.energy.value >= 7 && this.fun.value >= 7 && this.hunger.value >= 7) {
			this.setState('happy');
		}
	}

	private checkIfHungry(): void {
		if (this.hunger.value <= 6) {
			this.setState('hungry');
		}
	}

	private checkIfSad(): void {
		if (this.fun.value <= 6) {
			this.setState('sad');
		}
	}

	private checkIfSleepy(): void {
		if (this.energy.value <= 6) {
			this.setState('sleepy');
		}
	}

	setStateEating(): void {
		if (this.state !== 'eating') {
			this.state = 'eating';
			this.displayStateinUI();
		} else {
			this.state = 'happy';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	setStateSleeping(): void {
		if (this.state !== 'sleeping') {
			this.state = 'sleeping';
			this.displayStateinUI();
		} else {
			this.state = 'happy';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	setStatePlaying(): void {
		if (this.state !== 'playing') {
			this.state = 'playing';
			this.displayStateinUI();
		} else {
			this.state = 'happy';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	private displayStateinUI(): void {
		const tamagoSprite = document.querySelector('.rectangle') as HTMLElement;
		const tamagoText = document.querySelector('.rectangle__status--text') as HTMLElement;
		let stateText = '';
		switch (this.state) {
			case 'happy':
				stateText = 'HAPPY';
				break;
			case 'hungry':
				stateText = 'HUNGRY';
				break;
			case 'sad':
				stateText = 'SAD';
				break;
			case 'sleepy':
				stateText = 'SLEEPY';
				break;
			case 'eating':
				stateText = 'EATING';
				break;
			case 'sleeping':
				stateText = 'SLEEPING';
				break;
			case 'playing':
				stateText = 'PLAYING';
				break;
			case 'dead':
				stateText = 'DEAD';
				this.energy.value = 0;
				this.displayEnergy('.sleep__value');
				this.fun.value = 0;
				this.displayFun('.fun__value');
				this.hunger.value = 0;
				this.displayHunger('.hunger__value');
				const restartBtn = document.querySelector('.restart') as HTMLElement;
				restartBtn.style.display = 'none';
				const actionBtns = document.querySelector('.action-btns') as HTMLElement;
				actionBtns.style.display = 'flex';
				break;
		}

		tamagoSprite.classList.remove(tamagoSprite.classList[1]);
		tamagoSprite.classList.add(this.state);
		tamagoText.textContent = stateText;
	}

	handleRestart(): void {
		this.health.value = 10;
		this.energy.value = 10;
		this.fun.value = 10;
		this.hunger.value = 10;
		const restartBtn = document.querySelector('.restart') as HTMLElement;
		restartBtn.style.display = 'none';
		const actionBtns = document.querySelector('.action-btns') as HTMLElement;
		actionBtns.style.display = 'flex';
		this.checkStateChange();
		this.displayStateinUI();
	}

	displayHealth = (elementSelector: string): void => {
		const displayElement = document.querySelector(elementSelector) as HTMLElement;
		displayElement.textContent = this.health.value.toString();
	};

	displayHunger = (elementSelector: string): void => {
		const displayElement = document.querySelector(elementSelector) as HTMLElement;
		displayElement.textContent = this.hunger.value.toString();
	};

	displayEnergy = (elementSelector: string): void => {
		const displayElement = document.querySelector(elementSelector) as HTMLElement;
		displayElement.textContent = Math.floor(this.energy.value).toString();
	};

	displayFun = (elementSelector: string): void => {
		const displayElement = document.querySelector(elementSelector) as HTMLElement;
		displayElement.textContent = this.fun.value.toString();
	};

	decreaseHunger = (elementSelector: string): void => {
		if (this.hunger.value > 0) {
			this.hunger.value--;
		}
		this.displayHunger(elementSelector);
	};

	decreaseFun = (elementSelector: string): void => {
		if (this.fun.value > 0) {
			this.fun.value--;
			this.displayFun(elementSelector);
		} else {
			if (this.energy.value > 0) {
				this.energy.value -= energyDecreaseRate;
			}
		}
	};

	decreaseEnergy = (elementSelector: string): void => {
		if (this.energy.value > 0) {
			this.energy.value -= 1;
		}
		this.displayEnergy(elementSelector);
	};

	decreaseHealth = (elementSelector: string): void => {
		if (this.health.value > 0) {
			if (this.energy.value <= 0 || this.hunger.value <= 0) {
				this.health.value--;
			}
			this.displayHealth(elementSelector);
		}
	};

	mount = ({ healthElement, hungerElement, energyElement, funElement }): void => {
		this.displayEnergy(energyElement);
		this.displayHealth(healthElement);
		this.displayFun(funElement);
		this.displayHunger(hungerElement);
	};
}
