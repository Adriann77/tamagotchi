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
		displayElement.innerText = Math.floor(this.energy.value);
	};
	displayFun = elementSelector => {
		const displayElement = document.querySelector(elementSelector);
		displayElement.innerText = this.fun.value;
	};

	decreaseValues = () => {
		this.hunger.value -= 1;
		this.fun.value -= 1;

		setTimeout(() => {
			if (this.fun.value > 5) {
				this.energy.value -= 0.5;
			} else {
				this.energy.value--;
			}
		}, 1);

		if (this.hunger.value <= 0 || this.energy.value <= 0) {
			this.health.value -= 1;
		}

		Object.keys(this).forEach(stat => {
			if (this[stat].value < 0) {
				this[stat].value = 0;
			}
		});

		this.displayHealth('.health__value');
		this.displayHunger('.hunger__value');
		this.displayEnergy('.sleep__value');
		this.displayFun('.fun__value');
	};

	mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.displayHealth(healthElement);
		this.displayHunger(hungerElement);
		this.displayFun(funElement);
		this.displayEnergy(energyElement);
		setInterval(() => {
			this.decreaseValues();
		}, 1000);
	};
}
