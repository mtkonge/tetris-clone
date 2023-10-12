import { Block, BlockType } from "./Block";
import { Matrix2d } from "./Matrix2d";

export abstract class Piece {
    protected color: string;
    protected rotations: Block[][][] = [];
    protected currentRotationIndex = 0;

    protected abstract generatePiece(): void;

    public generateRotations() {
        for (let i = 0; i < 3; i++) {
            this.addNewRotationToShapes();
        }
    }

    nextRotationClockwise() {
        if (this.currentRotationIndex === 3) {
            this.currentRotationIndex = 0;
        } else {
            this.currentRotationIndex += 1;
        }
    }

    nextRotationAntiClockwise() {
        if (this.currentRotationIndex === 0) {
            this.currentRotationIndex = 3;
        } else {
            this.currentRotationIndex -= 1;
        }
    }
    public currentRotation() {
        return this.currentRotationIndex;
    }

    public currentShape() {
        return this.rotations[this.currentRotationIndex];
    }

    private addNewRotationToShapes() {
        const originalShape = this.rotations[this.rotations.length - 1];
        const shapeClone = new Matrix2d(
            originalShape.length,
            originalShape.length,
        ).grid();
        const center = {
            x: (originalShape.length - 1) / 2,
            y: (originalShape.length - 1) / 2,
        };
        for (let i = 0; i < originalShape.length; i++) {
            for (let j = 0; j < originalShape[i].length; j++) {
                const posAfterRotation = {
                    x: -(i - center.x) + center.x,
                    y: j - center.y + center.y,
                };

                shapeClone[posAfterRotation.y][posAfterRotation.x] =
                    originalShape[i][j];
            }
        }
        this.rotations.push(shapeClone);
    }

    constructor(rows: number, cols: number, color: string) {
        this.rotations.push(new Matrix2d(rows, cols).grid());
        this.color = color;
    }
}

export class I extends Piece {
    constructor() {
        super(4, 4, "#00DDFF");
        this.generatePiece();
        this.generateRotations();
    }

    generatePiece() {
        for (let i = 0; i < this.currentShape().length; i++) {
            this.currentShape()[1][i].value = BlockType.Using;
            this.currentShape()[1][i].color = this.color;
        }
    }
}

export class J extends Piece {
    constructor() {
        super(3, 3, "#0000FF");
        this.generatePiece();
        this.generateRotations();
    }

    generatePiece() {
        for (let i = 0; i < this.currentShape().length; i++) {
            this.currentShape()[1][i].value = BlockType.Using;
            this.currentShape()[1][i].color = this.color;
        }
        this.currentShape()[0][0].color = this.color;
        this.currentShape()[0][0].value = BlockType.Using;
    }
}

export class L extends Piece {
    constructor() {
        super(3, 3, "#FFAA00");
        this.generatePiece();
        this.generateRotations();
    }
    generatePiece() {
        for (let i = 0; i < this.currentShape().length; i++) {
            this.currentShape()[1][i].value = BlockType.Using;
            this.currentShape()[1][i].color = this.color;
        }
        this.currentShape()[0][2].color = this.color;
        this.currentShape()[0][2].value = BlockType.Using;
    }
}

export class O extends Piece {
    constructor() {
        super(3, 4, "#DDDD00");
        this.generatePiece();
    }
    generatePiece() {
        for (let i = 1; i < 3; i++) {
            this.currentShape()[0][i].value = BlockType.Using;
            this.currentShape()[0][i].color = this.color;
            this.currentShape()[1][i].value = BlockType.Using;
            this.currentShape()[1][i].color = this.color;
        }
    }
}

export class S extends Piece {
    constructor() {
        super(3, 3, "#FF0088");
        this.generatePiece();
        this.generateRotations();
    }
    generatePiece() {
        for (let i = 0; i < 2; i++) {
            this.currentShape()[0][i + 1].value = BlockType.Using;
            this.currentShape()[0][i + 1].color = this.color;
            this.currentShape()[1][i].value = BlockType.Using;
            this.currentShape()[1][i].color = this.color;
        }
    }
}

export class Z extends Piece {
    constructor() {
        super(3, 3, "#00FF00");
        this.generatePiece();
        this.generateRotations();
    }
    generatePiece() {
        for (let i = 0; i < 2; i++) {
            this.currentShape()[0][i].value = BlockType.Using;
            this.currentShape()[0][i].color = this.color;
            this.currentShape()[1][i + 1].value = BlockType.Using;
            this.currentShape()[1][i + 1].color = this.color;
        }
    }
}

export class T extends Piece {
    constructor() {
        super(3, 3, "#AA00AA");
        this.generatePiece();
        this.generateRotations();
    }
    generatePiece() {
        for (let i = 0; i < this.currentShape().length; i++) {
            this.currentShape()[1][i].value = BlockType.Using;
            this.currentShape()[1][i].color = this.color;
        }
        this.currentShape()[0][1].color = this.color;
        this.currentShape()[0][1].value = BlockType.Using;
    }
}
