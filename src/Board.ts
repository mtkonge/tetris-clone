import { Graphics } from "./Graphics";
import { Block } from "./block";
import { COLS, ROWS } from "./constants";

export class Board {
    private grid: Block[][];
    constructor(private graphics: Graphics) {
        this.grid = this.getEmptyBoard();
        console.table(this.grid);
        this.graphics.drawBoard(this.grid);
    }

    getEmptyBoard(): Block[][] {
        const emptyGrid = Array.from({ length: ROWS }, () => Array(COLS));
        for (let i = 0; i < emptyGrid.length; i++) {
            for (let j = 0; j < emptyGrid[i].length; j++) {
                emptyGrid[i][j] = { value: 0, color: "" };
            }
        }
        return emptyGrid;
    }
}
