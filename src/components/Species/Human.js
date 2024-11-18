import { Being } from "../abstract/Being.js";

export class Human extends Being {
	constructor(world, id, x, y, size = window.innerWidth / 150) {
		super(world, id, x, y, size);
		this.speed = 4;
		this.memSize = 64;
		this.health = 900;
		this.minerals = 0;
	}


}