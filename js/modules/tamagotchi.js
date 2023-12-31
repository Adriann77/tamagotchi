let energyDecreaseRate = 0.5;
const actionBtns = document.querySelector('.action-btns');
const restartBtn = document.querySelector('.restart');

export default class Tamagotchi {
	constructor() {
		this.state = 'happy';
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };

		this.setParametersInterval = setInterval(() => {
			if (this.state != 'eating' && this.state != 'sleeping' && this.state != 'playing' && this.state != 'dead') {
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
			if (this.state != 'eating' && this.state != 'sleeping' && this.state != 'playing' && this.state != 'dead') {
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
		if (this.fun.value < 10) {
			if (this.fun.value == 9) {
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
	setState(state) {
		this.state = state;
	}

	checkStateChange() {
		this.checkIfHappy();
		this.checkIfSad();
		this.checkIfHungry();
		this.checkIfSleepy();
		this.checkIfDying();
	}

	checkIfDying() {
		if (this.health.value <= 0) {
			this.setState('dead');
			this.displayStateinUI();
			actionBtns.style.display = 'none';
			restartBtn.style.display = 'block';
		}
	}

	checkIfHappy() {
		if (this.health.value >= 7 && this.energy.value >= 7 && this.fun.value >= 7 && this.hunger.value >= 7) {
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
			case 'dead':
				stateText = 'DEAD';
				this.energy.value = 0;
				this.displayEnergy('.sleep__value');
				this.fun.value = 0;
				this.displayFun('.fun__value');
				this.hunger.value = 0;
				this.displayHunger('.hunger__value');

				break;
		}

		tamagoSprite.classList.remove(tamagoSprite.classList[1]);
		tamagoSprite.classList.add(this.state);
		tamagoText.textContent = stateText;
	}

	handleRestart() {
		this.health.value = 10;
		this.energy.value = 10;
		this.fun.value = 10;
		this.hunger.value = 10;
		restartBtn.style.display = 'none';
		actionBtns.style.display = 'flex';
		this.checkStateChange();
		this.displayStateinUI();
	}

	displayHealth = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = this.health.value;
		displayElement.textContent == 10
			? (displayElement.style.fontSize = '40' + 'px')
			: (displayElement.style.fontSize = '60' + 'px');
	};
	displayHunger = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = this.hunger.value;
		displayElement.textContent == 10
			? (displayElement.style.fontSize = '40' + 'px')
			: (displayElement.style.fontSize = '60' + 'px');
	};
	displayEnergy = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = Math.floor(this.energy.value);
		displayElement.textContent == 10
			? (displayElement.style.fontSize = '40' + 'px')
			: (displayElement.style.fontSize = '60' + 'px');
	};
	displayFun = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.textContent = this.fun.value;
		displayElement.textContent == 10
			? (displayElement.style.fontSize = '40' + 'px')
			: (displayElement.style.fontSize = '60' + 'px');
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
