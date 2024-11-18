import { Forest } from "./components/Bioms/Forest.js";

const bioms = {
	forest: Forest,
}

export const WORLD_PARAMETERS = {
	geometry: 1,				// 0 — bordered, 1 — closed (torus)
	humanPopulation: 50,		// number
	forestCover: 0.25,		// kef
	humanSize: window.innerWidth / 235,		//	px
	inspectionMode: false,
}

export function listenUserActions(canvas, world) {
	listenStreamControls(world);
	listenParameters(canvas);

	canvas.addEventListener("click", (event) => {
		if (WORLD_PARAMETERS.inspectionMode) {
			inspect(event, canvas, world);
		}
	});
}

function inspect(event, canvas, world) {
	const rect = canvas.getBoundingClientRect();
	const mouseX = event.clientX - rect.left;
	const mouseY = event.clientY - rect.top;

	// check if clicked on Human
	for (const object of world.humans) {
		if (mouseX >= object.x - object.size && mouseX <= object.x + object.size &&
			mouseY >= object.y - object.size && mouseY <= object.y + object.size) {
			console.dir(object);
			break;
		}
	}

	// check if clicked on static misc
	for (const object of world.staticMisc) {
		if (mouseX >= object.x - object.size && mouseX <= object.x + object.size &&
			mouseY >= object.y - object.size && mouseY <= object.y + object.size) {
			console.dir(object);
			break;
		}
	}
}

function listenStreamControls(world) {
	let animationID;
	const parametersContainer = document.querySelector('.parameters__container');
	const playerControls = {
		play: document.querySelector('#play-btn'),
		pause: document.querySelector('#pause-btn'),
		nextFrame: document.querySelector('#next-frame-btn'),
		stop: document.querySelector('#stop-btn')
	}

	const playSimulation = () => {
		if (world.isAnimating) return;
		world.isAnimating = true;
		animationID = world.animate();
		parametersContainer.classList.add('hidden');
		playerControls.play.classList.add('hidden');
		playerControls.pause.classList.remove('hidden');
		playerControls.play.parentElement.classList.add('hidden');
	}
	const pauseSimulation = () => {
		world.isAnimating = false;
		window.cancelAnimationFrame(animationID);
		playerControls.play.classList.remove('hidden');
		playerControls.play.parentElement.classList.remove('hidden');
		playerControls.pause.classList.add('hidden');
	}

	playerControls.play.addEventListener('click', playSimulation);
	playerControls.pause.addEventListener('click', pauseSimulation);
	playerControls.nextFrame.addEventListener('click', () => {
		world.simulateNextFrame();
		world.renderCurrentFrame();
	});
	playerControls.stop.addEventListener('click', () => {
		world.isAnimating = false;
		window.cancelAnimationFrame(animationID);
		parametersContainer.classList.remove('hidden');
		playerControls.play.classList.remove('hidden');
		playerControls.pause.classList.add('hidden');
		world = new bioms.forest(WORLD_PARAMETERS);
		world.init();
		playerControls.play.parentElement.classList.remove('hidden');
	});
}

function listenParameters(canvas) {
	const inputs = {
		inspector: document.querySelector(".inspection"),
		geometry: document.querySelector('#geometry-control input[type="radio"]:checked'),
		humans: document.querySelector('#humans-control input'),
		trees: document.querySelector('#trees-control input'),
	}

	inputs.inspector.addEventListener('click', (event) => {
		WORLD_PARAMETERS.inspectionMode = !WORLD_PARAMETERS.inspectionMode;
		canvas.classList.toggle("inspecting");
	});

	inputs.humans.addEventListener('change', (event) => {
		WORLD_PARAMETERS.humanPopulation = parseInt(event.target.value);
	});
	inputs.trees.addEventListener('change', (event) => {
		WORLD_PARAMETERS.forestCover = parseInt(event.target.value);
	});
}