import { Block, BlockType } from "./Block";
import { Matrix2d } from "./Matrix2d";

export abstract class Piece {
    protected color: string;
    public shape: Block[][];

    protected abstract generatePiece(): void;

    constructor(rows: number, cols: number, color: string) {
        this.shape = new Matrix2d(rows, cols).grid();
        this.color = color;
    }
}

export class I extends Piece {
    constructor() {
        super(4, 4, "#00DDFF");
        this.generatePiece();
    }

    generatePiece() {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[1][i].value = BlockType.Using;
            this.shape[1][i].color = this.color;
        }
    }
}

export class J extends Piece {
    constructor() {
        super(3, 3, "#0000FF");
        this.generatePiece();
    }

    generatePiece() {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[1][i].value = BlockType.Using;
            this.shape[1][i].color = this.color;
        }
        this.shape[0][0].color = this.color;
        this.shape[0][0].value = BlockType.Using;
    }
}
export class L extends Piece {
    constructor() {
        super(3, 3, "#FFAA00");
        this.generatePiece();
    }
    generatePiece() {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[0][i].value = BlockType.Using;
            this.shape[0][i].color = this.color;
        }
        this.shape[1][0].color = this.color;
        this.shape[1][0].value = BlockType.Using;
    }
}

export class O extends Piece {
    constructor() {
        super(3, 4, "#DDDD00");
        this.generatePiece();
    }
    generatePiece() {
        for (let i = 1; i < 3; i++) {
            this.shape[1][i].value = BlockType.Using;
            this.shape[1][i].color = this.color;
            this.shape[2][i].value = BlockType.Using;
            this.shape[2][i].color = this.color;
        }
    }
}

export class S extends Piece {
    constructor() {
        super(3, 3, "#FF0088");
        this.generatePiece();
    }
    generatePiece() {
        for (let i = 0; i < 2; i++) {
            this.shape[0][i + 1].value = BlockType.Using;
            this.shape[0][i + 1].color = this.color;
            this.shape[1][i].value = BlockType.Using;
            this.shape[1][i].color = this.color;
        }
    }
}

export class Z extends Piece {
    constructor() {
        super(3, 3, "#00FF00");
        this.generatePiece();
    }
    generatePiece() {
        for (let i = 0; i < 2; i++) {
            this.shape[0][i].value = BlockType.Using;
            this.shape[0][i].color = this.color;
            this.shape[1][i + 1].value = BlockType.Using;
            this.shape[1][i + 1].color = this.color;
        }
    }
}

export class T extends Piece {
    constructor() {
        super(3, 3, "#AA00AA");
        this.generatePiece();
    }
    generatePiece() {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[1][i].value = BlockType.Using;
            this.shape[1][i].color = this.color;
        }
        this.shape[0][1].color = this.color;
        this.shape[0][1].value = BlockType.Using;
    }
}
