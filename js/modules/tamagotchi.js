let energyDecreaseRate = 0.5;

export default class Tamagotchi {
	constructor() {
		this.state = 'happy';
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };

		this.setParametersInterval = setInterval(() => {
			if (this.state != 'eating' && this.state != 'sleeping' && this.state != 'playing') {
				this.decreaseFun('.fun__value');
				this.decreaseHunger('.hunger__value');
				this.decreaseHealth('.health__value');
				this.displayStateinUI();
				this.checkStateChange();
			} else if (this.state == 'eating') {
				this.increaseHunger('.hunger__value');
			} else if (this.state == 'sleeping') {
				this.increaseEnergy('.sleep__value');
			} else if (this.state == 'playing') {
				this.increaseFun('.fun__value', '.sleep__value');
			}
		}, 1000);
		this.setEnergyInterval = setInterval(() => {
			if (this.state != 'eating' && this.state != 'sleeping' && this.state != 'playing') {
				this.decreaseEnergy('.sleep__value');
			}
		}, 2000);
	}

	increaseHunger(elementSelector) {
		if (this.hunger.value < 9) {
			this.hunger.value += 2;
		} else if (this.hunger.value == 9) {
			this.hunger.value++;
		}
		this.displayHunger(elementSelector);
	}

	increaseEnergy(elementSelector) {
		if (this.energy.value < 9) {
			this.energy.value += 2;
		} else if (this.energy.value == 9) {
			this.energy.value++;
		}
		this.displayEnergy(elementSelector);
	}

	increaseFun(elementSelector, energyElement) {
		if (this.energy.value > 0) {
			if (this.fun.value < 9) {
				this.fun.value += 2;
			} else if (this.fun.value == 9) {
				this.fun.value++;
			}
			this.energy.value--;
			this.displayEnergy(energyElement);
			this.displayFun(elementSelector);
		}
	}

	setState(state) {
		this.state = state;
	}

	checkStateChange() {
		this.checkIfHappy();
		this.checkIfSad();
		this.checkIfHungry();
		this.checkIfSleepy();
	}

	checkIfHappy() {
		if (this.health >= 7 && this.energy.value >= 7 && this.fun.value >= 7 && this.hunger.value >= 7) {
			this.setState('happy');
		}
	}

	checkIfHungry() {
		if (this.hunger.value <= 6) {
			this.setState('hungry');
		}
	}

	checkIfSad() {
		if (this.fun.value <= 6) {
			this.setState('sad');
		}
	}

	checkIfSleepy() {
		if (this.energy.value <= 6) {
			this.setState('sleepy');
		}
	}

	setStateEating() {
		if (this.state != 'eating') {
			this.state = 'eating';

			this.displayStateinUI();
		} else {
			this.state = 'happy';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	setStateSleeping() {
		if (this.state != 'sleeping') {
			this.state = 'sleeping';
			this.displayStateinUI();
		} else {
			this.state = 'happy';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	setStatePlaying() {
		if (this.state != 'playing') {
			this.state = 'playing';
			this.displayStateinUI();
		} else {
			this.state = 'happy';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	displayStateinUI() {
		const tamagoSprite = document.querySelector('.rectangle');
		const tamagoText = document.querySelector('.rectangle__status--text');
		let stateText = '';
		switch (this.state) {
			case '':
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
		}

		tamagoSprite.classList.remove(tamagoSprite.classList[1]);
		tamagoSprite.classList.add(this.state);
		tamagoText.textContent = stateText;
	}

	displayHealth = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = this.health.value;
	};
	displayHunger = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = this.hunger.value;
	};
	displayEnergy = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = Math.floor(this.energy.value);
	};
	displayFun = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = this.fun.value;
	};

	decreaseHunger = elementSelector => {
		if (this.hunger.value > 0) {
			this.hunger.value--;
		}
		this.displayHunger(elementSelector);
	};

	decreaseFun = elementSelector => {
		if (this.fun.value > 0) {
			this.fun.value--;
			this.displayFun(elementSelector);
		} else {
			if (this.energy.value > 0) {
				this.energy.value -= energyDecreaseRate;
			}
		}
	};
	decreaseEnergy = elementSelector => {
		if (this.energy.value > 0) {
			this.energy.value -= 1;
		}
		this.displayEnergy(elementSelector);
	};

	decreaseHealth = elementSelector => {
		if (this.health.value > 0) {
			if (this.energy.value <= 0 || this.hunger.value <= 0) {
				this.health.value--;
			}
			this.displayHealth(elementSelector);
		}
	};

	mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.displayEnergy(energyElement);
		this.displayHealth(healthElement);
		this.displayFun(funElement);
		this.displayHunger(hungerElement);
	};
}
