



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
		displayElement.innerText = Math.round(this.energy.value);
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
	decreaseFun = elementSelector => {
		if (this.fun.value > 0) {
			this.fun.value--;
			this.displayFun(elementSelector);
		}
	};
	decreaseEnergy = elementSelector => {
		this.displayEnergy(elementSelector);
		this.energy.value -= this.fun.value > 0 ? 0.5 : 1;
	};

	decreaseHealth = elementSelector => {
		if (this.health.value > 0) {
			this.displayHealth(elementSelector);
			if (this.energy.value == 0 || this.hunger.value == 0) {
				this.health.value--;
				this.displayHealth(elementSelector);
			}
		}
	};



	mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
		setInterval(() => {
			this.decreaseHealth(healthElement);
			this.decreaseHunger(hungerElement);
			this.decreaseFun(funElement);
			this.decreaseEnergy(energyElement);
		}, 1000);
	};
}
