import { Graphics } from "./Graphics";
import { BLOCKSIZE, COLS, ROWS } from "./constants";

export class Board {
    private grid: number[][]
    constructor(private graphics: Graphics) {
        this.grid = this.getEmptyBoard()
        graphics.drawFigureI({x: 0, y: 0})
        graphics.drawFigureL({x: BLOCKSIZE, y: 0})
        graphics.drawFigureO({x: BLOCKSIZE*2, y: 0})
        graphics.drawFigureJ({x: BLOCKSIZE*3, y: 0})
        graphics.drawFigureS({x: 0, y: BLOCKSIZE*3})
        graphics.drawFigureZ({x: 0, y: BLOCKSIZE*5})
    }

    getEmptyBoard() {
        return Array.from(
          {length: ROWS}, () => Array(COLS).fill(0)
        );
      }
}