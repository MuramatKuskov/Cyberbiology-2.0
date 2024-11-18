export class Being {
	constructor(world, id, x, y, size) {
		this.world = world;
		this.id = id;
		this.size = size;
		this.x = x;
		this.y = y;
		this.speed = 2;
		this.direction = Math.floor(Math.random() * 360);
		this.memSize;
		this.memory = [];
		this.initMemory();
		this.activityPointer = 0;
		this.lastMutation = 0;
		this.age = 0;
		this.isAlive = true;
		// colors, depends on food
		this.c_red = 0;		// predators
		this.c_green = 255;		// herbivores
		this.c_blue = 0;	//	poison catalysts
		this.c_family = 0;	// family
		this.color = `${this.c_red}, ${this.c_green}, ${this.c_blue}`;
	}

	// main lifetime function, defines behavior
	doSmth() {
		let breakFlag;
		let command;
		for (let cyc = 0; cyc < 15; cyc++) {
			breakFlag = 0;
			command = this.memory[this.activityPointer];
			switch (command) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					this.mutate();
					this.incrActivityPointer(1);
					breakFlag = 1;
					break;
				case 9:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
					// this.conditionalAction(this.move());
					// breakFlag = 1;
					this.move();
					this.incrActivityPointer(1);
					break;
				// case 16:
				// 	this.fission();
				// 	this.incrActivityPointer(1);
				// 	break;
				case 20:
					this.turn();
					this.incrActivityPointer(2);
					break;
				// case 23:
				// case 24:
				// case 25:
				// case 26:
				// 	this.actWithParam(this.move());
				// 	breakFlag = 1;
				// 	break;
				// case 29:
				// 	this.actWithParam(this.swim());
				// 	breakFlag = 1;
				// 	break;
				// case 33:
				// 	this.min2Health();
				// 	this.incrActivityPointer(1);
				// 	breakFlag = 1;
				// 	break;
				// case 34:
				// case 35:
				// 	this.actWithParam(this.eat());
				// 	breakFlag = 1;
				// 	break;
				// case 36:
				// case 37:
				// 	this.actWithParam(this.giveRes());
				// 	break;
				// case 38:
				// case 39:
				// 	this.actWithParam(this.mergeRes());
				// 	break;
				// case 40:
				// 	this.actWithParam(this.look());
				// 	break;
				// case 41:
				// 	this.actWithParam(this.poison2Food());
				// 	breakFlag = 1;
				// 	break;
				// case 42:
				// 	this.actWithParam(this.checkHP());
				// 	break;
				// case 43:
				// 	this.actWithParam(this.checkMinerals());
				// 	break;
				// case 46:
				// 	this.actWithParam(this.isEncirclemented());
				// 	break;
				// case 52:
				// 	this.genAttack();
				// 	this.incrActivityPointer(1);
				// 	breakFlag = 1;
				// 	break;
				default:
					this.incrActivityPointer(1);
					break;
			}
			if (breakFlag === 1) break;
		}

		// выход из функции
		// действия перед передачей контроля следующему боту
		if (this.isAlive) {
			this.age = this.age + 1;
			this.lastMutation = this.lastMutation + 1;
			// если накопилось много энергии - дать потомство
			// if (this.health > 999) {
			// 	this.fission();
			// }
			// молодые тратят 1 энергии на ход, пожилые - 3
			this.health = this.age < 600 ? this.health - 1 : this.health - 3;
			// если энергии не осталось - бот умирает
			// if (this.health <= 0) {
			// 	this.isAlive = false;
			// 	return;
			// }
			// после этого возраста есть шанс умереть
			// if (this.age > 1000) {
			// 	if (Math.random() < 0.1) {
			// 		this.isAlive = false;
			// 		return;
			// 	}
			// }
		}
	}

	// заполняет память случайным набором команд
	initMemory() {
		this.memory = [20, 1, 40, 0, 43, 0, 43, 35, 35, 35, 43, 41, 42, 33, 67];
		while (this.memory.length < this.memSize) {
			this.memory.push(Math.floor(Math.random() * this.memSize))
		}
	}

	mutate() {
		let genA = Math.floor(Math.random() * this.memSize);
		let genB = Math.floor(Math.random() * this.memSize);
		this.memory[genA] = genB;
		genA = Math.floor(Math.random() * this.memSize);
		genB = Math.floor(Math.random() * this.memSize);
		this.memory[genB] = genA;
		this.lastMutation = 0;
	}

	conditionalAction(x) {
		const mod = this.memory[(this.activityPointer + x) % this.memSize];
		this.incrActivityPointer(mod);
	}

	incrActivityPointer(x) {
		this.activityPointer = (this.activityPointer + x) % this.memSize;
	}

	move() {
		const deltaX = Math.cos(this.direction) * this.speed;
		const deltaY = Math.sin(this.direction) * this.speed;

		// проверка на водоем на пути
		if (
			this.x + deltaX > this.world.river.x - this.size / 3
			&&
			this.x + deltaX < this.world.river.width - this.size / 3
			&&
			this.y + deltaY > this.world.river.y - this.size / 3
			&&
			this.y + deltaY < this.world.river.height - this.size / 3
		) {
			console.log(3);
		}

		this.x += deltaX;
		this.y += deltaY;

		// границы мира
		if (this.world.geometry === 0) {
			if (this.x < this.size) this.x = this.size;
			if (this.x + this.size > window.innerWidth) this.x = window.innerWidth - this.size;
			if (this.y < this.size) this.y = this.size;
			if (this.y + this.size > window.innerHeight) this.y = window.innerHeight - this.size;
		} else if (this.world.geometry === 1) {
			if (this.x + this.size / 2 < 0) this.x = window.innerWidth - this.size;
			if (this.x + this.size > window.innerWidth) this.x = 0 + this.size / 2;
			if (this.y + this.size < 0) this.y = window.innerHeight - this.size;
			if (this.y + this.size > window.innerHeight) this.y = 0;
		}
	}

	turn() {
		this.direction = Math.floor(Math.random() * 360);
	}
}