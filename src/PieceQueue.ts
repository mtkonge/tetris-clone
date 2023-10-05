import { I, J, L, O, Piece, S, T, Z } from "./Pieces";

export class PieceQueue {
    public queue: Piece[] = [];
    constructor() {
        this.generateQueue();
        this.generateQueue();
    }

    generateQueue() {
        const pieces = [I, J, L, O, S, Z, T].map((x) => new x());
        let currentIndex = 0;
        for (let i = pieces.length; i > 0; i--) {
            currentIndex = Math.floor(Math.random() * pieces.length);
            this.queue.push(pieces[currentIndex]);
            pieces.splice(currentIndex, 1);
        }
    }

    next() {
        this.queue.shift();
        if (this.queue.length <= 7) {
            this.generateQueue();
        }
    }
}
