import { I, J, L, O, Piece, S, T, Z } from "./Pieces";

export class PieceOrder {
    private pieces: Piece[] = [];
    public order: Piece[] = [];
    constructor() {
        this.generateOrder();
        this.generateOrder();
    }

    generatePieces() {
        this.pieces.push(
            new I(),
            new J(),
            new L(),
            new O(),
            new S(),
            new Z(),
            new T(),
        );
    }

    generateOrder() {
        this.generatePieces();
        let randomNumber = 0;
        for (let i = this.pieces.length; i > 0; i--) {
            randomNumber = Math.floor(Math.random() * this.pieces.length);
            this.order.push(this.pieces[randomNumber]);
            this.pieces.splice(randomNumber, 1);
        }
    }

    next() {
        this.pieces.splice(0, 1);
        if (this.order.length <= 7) {
            this.generateOrder();
        }
    }
}
