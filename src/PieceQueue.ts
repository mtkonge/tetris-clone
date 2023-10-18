import { I, J, L, O, Piece, S, T, Z } from "./Pieces";

export class PieceQueue {
    private holding: Piece | undefined;
    private queue: Piece[] = [];
    constructor() {
        this.generateQueue();
        this.generateQueue();
    }

    generateQueue() {
        const pool = [I, J, L, O, S, Z, T].map((x) => new x());
        for (let i = pool.length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            this.queue.push(pool[randomIndex]);
            pool.splice(randomIndex, 1);
        }
    }

    switch() {
        const before = this.holding;
        this.holding = this.queue.shift();
        if (before) this.queue.unshift(before);
    }

    step() {
        this.queue.shift();
        if (this.queue.length <= 7) {
            this.generateQueue();
        }
    }
    current() {
        return this.queue[0];
    }
}
