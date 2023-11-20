export default class TamagotchiStates {
	constructor(status) {
		this.status = status;
	}

	showCurrentStatus(status, currStatusText) {
		const healthVal = this.status.children[0].children[0].textContent;
		const hungerVal = this.status.children[0].children[1].textContent;
		const energyVal = this.status.children[0].children[2].textContent;
		const funVal = this.status.children[0].children[3].textContent;

        if(healthVal >= 7 && hungerVal >= 7 && energyVal>=7 && funVal >=7){
            this.status.classList.remove(status)
            this.status.classList.add('happy')
            currStatusText.innerText = 'HAPPY'
        }else if(funVal <= 6){
            this.status.classList.remove(status)
            this.status.classList.add('bored')
            currStatusText.textContent = 'BORED'
        }else if(hungerVal <= 6){
            this.status.classList.remove(status)
            this.status.classList.add('hungry')
            currStatusText.textContent = 'HUNGRY'
        }else if(energyVal <= 6){
            this.status.classList.remove(status)
            this.status.classList.add('sleepy')
            currStatusText.textContent = 'SLEEPY'
        }



	}

	getCurrentStatus() {
        setInterval(() => {
            const currStatus = this.status.classList[1];
            const currStatusText = document.querySelector('.rectangle__status--text')
			this.showCurrentStatus(currStatus, currStatusText);
		}, 1000);
	}
}
