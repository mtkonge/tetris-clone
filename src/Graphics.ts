import { Coordinate } from "./Coordinate";
import { Piece } from "./Pieces";
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

    drawRectangle(pos: Coordinate, color: string) {
        this.context.fillStyle = color;
        for (let i = 0; i < 4; i++)
            this.context.fillRect(
                pos.x,
                pos.y + i * BLOCKSIZE,
                BLOCKSIZE,
                BLOCKSIZE,
            );
    }

    drawPiece(piece: Piece, pos: Coordinate) {
        for (let i = 0; i < piece.currentShape().length; i++) {
            for (let j = 0; j < piece.currentShape()[i].length; j++) {
                if (
                    piece.currentShape()[i][j].value === BlockType.Using ||
                    piece.currentShape()[i][j].value === BlockType.Obstructed
                ) {
                    this.drawSquare(
                        { x: pos.x + j * BLOCKSIZE, y: pos.y + i * BLOCKSIZE },
                        piece.currentShape()[i][j].color,
                    );
                }
            }
        }
    }
    drawBoard(board: Block[][]) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (
                    board[i][j].value === BlockType.Using ||
                    board[i][j].value === BlockType.Obstructed
                ) {
                    this.drawSquare(
                        { x: BLOCKSIZE * i, y: BLOCKSIZE * j },
                        board[i][j].color,
                    );
                }
            }
        }
    }
}
