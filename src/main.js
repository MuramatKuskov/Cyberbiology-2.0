import { Forest } from "./components/Bioms/Forest.js";
import { WORLD_PARAMETERS, listenUserActions } from "./world-parameters.js";

const CANVAS = document.querySelector("canvas");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;
window.ctx = CANVAS.getContext('2d');

let forest = new Forest(WORLD_PARAMETERS);
forest.init();
listenUserActions(CANVAS, forest);
