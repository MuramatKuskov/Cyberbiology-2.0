import { World } from "../World/World";


export class Being {
	constructor() {
		this.x = Math.round(Math.random() % World.length);
		this.y = Math.round(Math.random() % World.height);
		this.memSize = 64;
		this.memory = [];
		this.activityPointer = 0;
		//stats
		this.health = 900;
		// 1 mineral = 4 health
		this.minerals = 0;
		this.age = 0;
		this.isAlive = true;
	}
}