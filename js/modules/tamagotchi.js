let energyDecreaseRate = 0.5;
const eatBtn = document.querySelector('.hunger');

export default class Tamagotchi {
	constructor() {
		this.state = 'happy';
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };

		this.setParametersInterval = setInterval(() => {
			if (this.state != 'eating') {
				this.decreaseFun('.fun__value');
				this.decreaseHunger('.hunger__value');
				this.decreaseHealth('.health__value');
				this.displayStateinUI();
				this.checkStateChange();
			} else if (this.state == 'eating') {
				this.increaseHunger('.hunger__value');
			}
		}, 1000);
		this.setEnergyInterval = setInterval(() => {
			if (this.state != 'eating') {
				this.decreaseEnergy('.sleep__value');
			}
		}, 2000);
	}

	increaseHunger(elementSelector) {
		this.hunger.value += 2;
		this.displayHunger(elementSelector);
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
		const prevState = this.state;
		if (this.state != 'eating') {
			this.state = 'eating';

			this.displayStateinUI();
		} else {
			this.state = '';
			this.checkStateChange();
			this.displayStateinUI();
		}
	}

	displayStateinUI() {
		const tamagoSprite = document.querySelector('.rectangle');
		const tamagoText = document.querySelector('.rectangle__status--text');
		switch (this.state) {
			case '':
				tamagoSprite.classList.remove(tamagoSprite.classList[1]);
				tamagoSprite.classList.add('happy');
				tamagoText.textContent = 'HAPPY';
			case 'happy':
				tamagoSprite.classList.remove(tamagoSprite.classList[1]);
				tamagoSprite.classList.add('happy');
				tamagoText.textContent = 'HAPPY';
				break;
			case 'hungry':
				tamagoSprite.classList.remove(tamagoSprite.classList[1]);
				tamagoSprite.classList.add('hungry');
				tamagoText.textContent = 'HUNGRY';
				break;
			case 'sad':
				tamagoSprite.classList.remove(tamagoSprite.classList[1]);
				tamagoSprite.classList.add('sad');
				tamagoText.textContent = 'SAD';
				break;
			case 'sleepy':
				tamagoSprite.classList.remove(tamagoSprite.classList[1]);
				tamagoSprite.classList.add('sleepy');
				tamagoText.textContent = 'SLEEPY';
				break;
			case 'eating':
				tamagoSprite.classList.remove(tamagoSprite.classList[1]);
				tamagoSprite.classList.add('eating');
				tamagoText.textContent = 'EATING';

				break;
		}
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
