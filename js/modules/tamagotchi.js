let energyDecreaseRate = 1;
export default class Tamagotchi {
	constructor() {
		this.health = { value: 10, importance: 1 };
		this.hunger = { value: 10, importance: 3 };
		this.energy = { value: 10, importance: 2 };
		this.fun = { value: 10, importance: 4 };
		this.feeding = false;
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
		if (!this.feeding && this.hunger.value > 0) {
			this.hunger.value--;
			this.displayHunger(elementSelector);
		} else if (this.feeding && this.hunger.value >= 0 && this.hunger.value <10) {
      
      if(this.hunger.value == 9){
        this.hunger.value +=1
      }else if(this.hunger.value ==10){
        this.hunger.value = 10
      }else if(this.hunger.value <=8){
        this.hunger.value +=2
      }
			this.displayHunger(elementSelector);
		}
	};

	decreaseFun = (elementSelector, energyElementSelector) => {
		if (!this.feeding && this.fun.value > 0) {
			this.fun.value--;
			this.displayFun(elementSelector);
			if (energyDecreaseRate !== 1) energyDecreaseRate = 1;
		} else {
			energyDecreaseRate = 2;
			this.decreaseEnergy(energyElementSelector);
		}
	};
	decreaseEnergy = elementSelector => {
		if (!this.feeding && this.energy.value > 0) {
			this.energy.value -= energyDecreaseRate;
		}
		if (this.energy.value <= 0) {
			this.energy.value = 0;
		}
		this.displayEnergy(elementSelector);
	};

	decreaseHealth = elementSelector => {
		if (!this.feeding && this.health.value > 0) {
			if (this.energy.value <= 0 || this.hunger.value <= 0) {
				this.health.value--;
			}
			this.displayHealth(elementSelector);
		}
	};

	startFeeding() {
		if (!this.feeding) {
			this.feeding = true;
		} else {
			this.feeding = false;
		}
	}

	stopFeeding() {
		if (this.feeding) {
			this.feeding = false;
		}
	}

	checkCurrentStatus() {
		const tamagoSpirit = document.querySelector('.rectangle');
		const tamagoText = document.querySelector('.rectangle__status--text');
		tamagoSpirit.classList.remove(tamagoSpirit.classList[1]);

		const states = [
			{
				value: this.hunger.value,
				importance: this.hunger.importance,
				state: 'hungry',
			},
			{
				value: this.fun.value,
				importance: this.fun.importance,
				state: 'sad',
			},
			{
				value: this.energy.value,
				importance: this.energy.importance,
				state: 'sleepy',
			},
		];

		const currentState = states.sort((a, b) => b.importance - a.importance).find(state => state.value <= 6);

		if (!this.feeding) {
			if (this.health.value >= 7 && this.hunger.value >= 7 && this.fun.value >= 7 && this.energy.value >= 7) {
				tamagoSpirit.classList.add('happy');
				tamagoText.textContent = tamagoSpirit.classList[1].toUpperCase();
			} else if (currentState) {
				tamagoSpirit.classList.add(currentState.state);
				tamagoText.textContent = currentState.state.toUpperCase();
			}
		} else if (this.feeding) {
			tamagoSpirit.classList.add('eating');
			tamagoText.textContent = 'EATING';
		}
	}
	mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
		this.displayEnergy(energyElement);
		this.displayHealth(healthElement);
		this.displayFun(funElement);
		this.displayHunger(hungerElement);
		setInterval(() => {
			this.decreaseHealth(healthElement);
			this.decreaseHunger(hungerElement);
			this.decreaseFun(funElement, energyElement);
			this.checkCurrentStatus();
		}, 1000);
		setInterval(() => {
			this.decreaseEnergy(energyElement);
		}, 2000);
	};
}
