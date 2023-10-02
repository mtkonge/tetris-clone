export class GameLoop {
    private fps: number;
    private interval: number;
    private lastTime: number;
    private gameIteration: (deltaTime: number) => void;

    constructor(fps: number, gameIteration: (deltaTime: number) => void) {
        this.fps = fps;
        this.interval = 1000 / this.fps;
        this.lastTime = 0;
        this.gameIteration = gameIteration;
        this.update();
    }
    private update() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTime;

        if (deltaTime >= this.interval) {
            this.gameIteration(deltaTime);
            this.lastTime = currentTime - (deltaTime % this.interval);
        }

        requestAnimationFrame(this.update.bind(this));
    }
}
