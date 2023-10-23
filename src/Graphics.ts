import { Coordinate } from "./Coordinate";
import { Block, BlockType } from "./Block";
import "./constants";
import { BLOCKSIZE, graphicalOffsets } from "./constants";
import { I, O, Piece } from "./Pieces";

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
                        {
                            x: BLOCKSIZE * x,
                            y: BLOCKSIZE * y,
                        },
                        board[y][x].color,
                    );
                }
            }
        }
    }

    drawPiece(piece: Piece) {
        for (let y = 0; y < piece.currentShape().length; y++) {
            for (let x = 0; x < piece.currentShape()[y].length; x++) {
                if (
                    piece.currentShape()[y][x].value === BlockType.Using ||
                    piece.currentShape()[y][x].value === BlockType.Obstructed
                ) {
                    if (piece instanceof O) {
                        this.drawSquare(
                            {
                                x: BLOCKSIZE * (x + graphicalOffsets.O.x),
                                y: BLOCKSIZE * (y + graphicalOffsets.O.y),
                            },
                            piece.currentShape()[y][x].color,
                        );
                    } else if (piece instanceof I) {
                        this.drawSquare(
                            {
                                x: BLOCKSIZE * (x + graphicalOffsets.I.x),
                                y: BLOCKSIZE * (y + graphicalOffsets.I.y),
                            },
                            piece.currentShape()[y][x].color,
                        );
                    } else {
                        this.drawSquare(
                            {
                                x: BLOCKSIZE * (x + graphicalOffsets.JLSTZ.x),
                                y: BLOCKSIZE * (y + graphicalOffsets.JLSTZ.y),
                            },
                            piece.currentShape()[y][x].color,
                        );
                    }
                }
            }
        }
    }
}
