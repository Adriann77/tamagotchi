let energyDecreaseRate = 1;
export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };

		console.log('Tamagotchi initialized');
	}

	displayHealth = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.health.value;
	};
	displayHunger = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.hunger.value;
	};
	displayEnergy = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.energy.value;
	};
	displayFun = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.fun.value;
	};

	decreaseHunger = elementSelector => {
		if (this.hunger.value > 0) {
			this.hunger.value--;
			this.displayHunger(elementSelector);
		}
	};
	decreaseFun = (elementSelector, energyElementSelector) => {
		if (this.fun.value > 0) {
			this.fun.value--;
			this.displayFun(elementSelector);
      energyDecreaseRate = 1
		} else {
			energyDecreaseRate = 2;
			this.decreaseEnergy(energyElementSelector);
		}
	};
	decreaseEnergy = elementSelector => {
		if (this.energy.value > 0) {
			this.energy.value -= energyDecreaseRate;
		}
		if (this.energy.value <= 0) {
			this.energy.value = 0;
		}
		this.displayEnergy(elementSelector);
	};

	decreaseHealth = elementSelector => {
		if (this.health.value > 0) {
			if (this.hunger.value <= 0 && this.energy.value <= 0) {
				this.health.value -= 2;
			} else if (this.energy.value <= 0 || this.hunger.value <= 0) {
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
		setInterval(() => {
			this.decreaseHealth(healthElement);
			this.decreaseHunger(hungerElement);
			this.decreaseFun(funElement, energyElement);
		}, 1000);
		setInterval(() => {
			this.decreaseEnergy(energyElement);
		}, 2000);
	};
}
