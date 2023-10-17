import { Coordinate } from "./Coordinate";
import { Block, BlockType } from "./Block";
import "./constants";
import { BLOCKSIZE } from "./constants";

export class Graphics {
    private context: CanvasRenderingContext2D;
    constructor(private canvas: HTMLCanvasElement) {
        this.context = this.canvas.getContext("2d")!;
        this.clear();
    }
    clear() {
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSquare(pos: Coordinate, color: string) {
        this.context.fillStyle = color;
        this.context.fillRect(pos.x, pos.y, BLOCKSIZE, BLOCKSIZE);
    }
    drawBoard(board: Block[][]) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (
                    board[y][x].value === BlockType.Using ||
                    board[y][x].value === BlockType.Obstructed
                ) {
                    this.drawSquare(
                        { x: BLOCKSIZE * x, y: BLOCKSIZE * y },
                        board[y][x].color,
                    );
                }
            }
        }
    }
}
