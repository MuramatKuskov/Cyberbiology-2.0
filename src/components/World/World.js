

export class World {
	constructor() {

	}

	drawField(ctx, x, y, width, height) {
		ctx.fillStyle = '#98fb98';
		ctx.fillRect(x, y, width, height);
	}

	drawForest(ctx, x, y, width, height) {
		ctx.fillStyle = '#008000';
		ctx.fillRect(x, y, width, height);

		// Рисование деревьев
		for (let i = 0; i < 100; i++) {
			const treeX = x + Math.random() * width;
			const treeY = y + Math.random() * height;
			const treeWidth = Math.random() * 10 + 10;
			const treeHeight = Math.random() * 20 + 20;

			ctx.fillStyle = '#32CD32';
			ctx.fillRect(treeX, treeY, treeWidth, treeHeight);
		}
	}

	drawRiver(ctx, x, y, width, height) {
		ctx.fillStyle = '#0000FF';
		ctx.fillRect(x, y, width, height);

		// Рисование волн
		for (let i = 0; i < 100; i++) {
			const waveX = x + Math.random() * width;
			const waveY = y + Math.random() * height;
			const waveWidth = Math.random() * 10 + 10;
			const waveHeight = Math.random() * 5 + 5;

			ctx.fillStyle = '#4169E1';
			ctx.fillRect(waveX, waveY, waveWidth, waveHeight);
		}
	}
}