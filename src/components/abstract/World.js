import { Human } from "../Species/Human.js";

export class World {
	constructor(PARAMETERS) {
		this.isAnimating = false;
		this.geometry = PARAMETERS.geometry;
		this.forestCover = PARAMETERS.forestCover * 100;
		this.newTreeSize = window.innerWidth / 135;
		this.humans = Array(PARAMETERS.humanPopulation);
		this.humanSize = PARAMETERS.humanSize;
		this.staticMisc = [];
		this.river = {
			x: 0,
			y: window.innerHeight / 4,
			width: window.innerWidth,
			height: window.innerHeight / 4
		};
		this.age = 0;
	}

	init() {
		// trees
		for (let i = 0; i < this.forestCover; i++) {
			const [x, y] = this.getPointOutsideArea(this.newTreeSize, this.river);
			this.staticMisc.push({ type: "tree", x: x, y: y, size: this.newTreeSize });
		}

		// humans
		for (let i = 0; i < this.humans.length; i++) {
			const [x, y] = this.getPointOutsideArea(this.humanSize, this.river);
			// let x = Math.random() * (window.innerWidth - this.humanSize) + this.humanSize;
			// let y = Math.random() * (window.innerHeight - this.humanSize) + this.humanSize;
			const human = new Human(this, i, x, y, this.humanSize);
			this.humans[i] = human;
		}

		// organic
		for (let i = 0; i < this.humans.length / 2; i++) {
			const size = window.innerWidth / 250;
			let x = this.getPointWithinWorld('x', size);
			let y = this.getPointWithinWorld('y', size);
			this.staticMisc.push({ type: "organic", x: x, y: y, size: size });
		}

		this.renderCurrentFrame();
	}

	getPointWithinWorld(axis, subjectSize) {
		if (axis !== "x" && axis !== "y") {
			throw new Error("Valid axis required ('x' or 'y')");
		}
		let c;
		if (axis === "x") {
			c = Math.random() * (window.innerWidth - subjectSize) + subjectSize;
		} else {
			c = Math.random() * (window.innerHeight - subjectSize) + subjectSize;
		}
		return c;
	}

	getPointOutsideArea(subjectSize, area) {
		let x = this.getPointWithinWorld('x', subjectSize);
		let y = this.getPointWithinWorld('y', subjectSize);

		while (
			x > area.x - subjectSize / 3
			&&
			x < area.width - subjectSize / 3
			&&
			y > area.y - subjectSize / 3
			&&
			y < area.y + area.height - subjectSize / 3
		) {
			x = this.getPointWithinWorld('x', subjectSize);
			y = this.getPointWithinWorld('y', subjectSize);
		}
		return [x, y]
	}

	// example
	drawRiver() {
		window.ctx.fillStyle = '#0000FF';
		window.ctx.fillRect(this.river.x, this.river.y, this.river.width, this.river.height);

		// window.ctx.strokeStyle = "red";
		// window.ctx.beginPath();
		// window.ctx.moveTo(this.river.x, this.river.y);
		// window.ctx.lineTo(this.river.width, this.river.y);
		// window.ctx.lineTo(this.river.width, this.river.height);
		// window.ctx.lineTo(this.river.x, this.river.height);
		// window.ctx.fill();
		// window.ctx.stroke();

		// window.ctx.beginPath();
		// window.ctx.moveTo(0, window.innerHeight / 7);
		// ctx.lineTo(window.innerWidth / 2, window.innerHeight / 20);
		// ctx.lineTo(window.innerWidth, window.innerHeight / 4.75);
		// ctx.lineTo(window.innerWidth, window.innerHeight / 2.8);
		// ctx.lineTo(window.innerWidth / 1.8, window.innerHeight / 4.7);
		// ctx.lineTo(window.innerWidth / 2.3, window.innerHeight / 2.6);
		// ctx.lineTo(0, window.innerHeight / 3);
		// ctx.fill();

		// Рисование волн
		for (let i = 0; i < window.innerWidth / 20; i++) {
			const waveWidth = Math.random() * 15 + 15;
			const waveHeight = Math.random() * 5 + 7;
			const waveX = this.river.x + Math.random() * this.river.width - waveWidth;
			const waveY = this.river.y + Math.random() * (this.river.height - waveHeight);

			ctx.fillStyle = '#4169E1';
			ctx.fillRect(waveX, waveY, waveWidth, waveHeight);
		}
	}

	drawCirlce(x, y, size, color) {
		window.ctx.fillStyle = color;
		window.ctx.beginPath();
		window.ctx.arc(x, y, size, 0, Math.PI * 2, false);
		window.ctx.fill();
	}

	drawBeing(being) {
		const { x, y, size, color, /* statusColor */ } = being;
		// outer (status) circle
		this.drawCirlce(x, y, size + size / 3, "orange" /* statucSolor */);
		// inner (body)
		this.drawCirlce(x, y, size, `rgb(${color})`);
	}

	renderCurrentFrame() {
		// очистка
		window.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		// поле
		window.ctx.fillStyle = '#1eb025';
		window.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		this.age = this.age + 1;
		// река
		this.drawRiver();
		// челы
		this.humans.forEach(human => this.drawBeing(human));
		// окружение
		this.staticMisc.forEach(entry => {
			switch (entry.type) {
				case "tree":
					this.drawCirlce(entry.x, entry.y, entry.size, "green");
					break;
				case "remains":
					this.drawCirlce(entry.x, entry.y, entry.size, "orange");
					break;
				case "organic":
					this.drawCirlce(entry.x, entry.y, entry.size, "yellow");
					break;
			}
		});
	}

	simulateNextFrame() {
		this.humans.forEach(human => {
			if (human.isAlive) human.doSmth();
			if (!human.isAlive) {
				this.humans.splice(i, 1);
				this.staticMisc.push({ type: "remains", x: human.x, y: human.y, size: human.size / 4 });
			}
		});
	}

	animate() {
		if (!this.isAnimating) return;
		const animationID = requestAnimationFrame(() => this.animate());
		this.simulateNextFrame();
		this.renderCurrentFrame();
		return animationID;
	}
}