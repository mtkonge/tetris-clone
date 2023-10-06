import { Block, BlockType } from "./Block";

export class Matrix2d {
    private grid_: Block[][] = [];
    constructor(rows: number, cols: number) {
        this.createBlankGrid(rows, cols);
    }

    createBlankGrid(rows: number, cols: number) {
        const blankGrid = Array.from({ length: rows }, () => Array(cols));
        for (let i = 0; i < blankGrid.length; i++) {
            for (let j = 0; j < blankGrid[i].length; j++) {
                blankGrid[i][j] = { value: BlockType.Empty, color: "" };
            }
        }
        this.grid_ = blankGrid;
    }
    grid() {
        return this.grid_;
    }
}
