import { Block, BlockType } from "./Block";

export class Piece {
    public shape: Block[][] = [];
    public color = "";
    constructor(gridSize: number) {
        this.shape = this.emptyShape(gridSize);
    }

    emptyShape(gridSize: number): Block[][] {
        const emptyGrid = Array.from({ length: gridSize }, () =>
            Array(gridSize),
        );
        for (let i = 0; i < emptyGrid.length; i++) {
            for (let j = 0; j < emptyGrid[i].length; j++) {
                emptyGrid[i][j] = { value: BlockType.Empty, color: "" };
            }
        }
        return emptyGrid;
    }
}

export class I extends Piece {
    constructor() {
        super(4);
        this.color = "#00DDFF";
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
        super(3);
        this.color = "#0000FF";
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
class L extends Piece {
    constructor() {
        super(3);
    }
}

class O extends Piece {
    constructor() {
        super(4);
    }
}
