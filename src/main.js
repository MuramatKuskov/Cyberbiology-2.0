import { World } from "./components/World/World.js";

const CANVAS = document.querySelector(".canvas");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;
const ctx = CANVAS.getContext('2d');
const world = new World();
world.drawField(ctx, 0, 0, window.innerWidth, window.innerHeight);
world.drawForest(ctx, 0, window.innerHeight / 1.4, window.innerWidth, window.innerHeight);
world.drawRiver(ctx, 0, 0, window.innerWidth, window.innerHeight / 4);