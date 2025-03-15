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

    drawHighlightedSquare(pos: Coordinate) {
        this.context.fillStyle = "white";
        this.context.fillRect(pos.x, pos.y, BLOCKSIZE, BLOCKSIZE);
        this.context.fillStyle = "grey";
        this.context.fillRect(
            pos.x + 2,
            pos.y + 2,
            BLOCKSIZE - 4,
            BLOCKSIZE - 4,
        );
        this.context.fillStyle = "white";
        this.context.fillRect(
            pos.x + 4,
            pos.y + 4,
            BLOCKSIZE - 8,
            BLOCKSIZE - 8,
        );
    }

    drawTetriminoSquare(pos: Coordinate, color: string) {
        this.context.fillStyle = "white";
        this.context.fillRect(pos.x, pos.y, BLOCKSIZE, BLOCKSIZE);
        this.context.fillStyle = color;
        this.context.fillRect(
            pos.x + 1,
            pos.y + 1,
            BLOCKSIZE - 2,
            BLOCKSIZE - 2,
        );
    }
    drawBoard(board: Block[][]) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (
                    board[y][x].value === BlockType.Using ||
                    board[y][x].value === BlockType.Obstructed
                ) {
                    this.drawTetriminoSquare(
                        {
                            x: BLOCKSIZE * x,
                            y: BLOCKSIZE * y,
                        },
                        board[y][x].color,
                    );
                }
                if (board[y][x].value === BlockType.Highlighted) {
                    this.drawHighlightedSquare({
                        x: BLOCKSIZE * x,
                        y: BLOCKSIZE * y,
                    });
                }
            }
        }
    }

    drawPiece(piece: Piece, pos: Coordinate = { x: 0, y: 0 }) {
        for (let y = 0; y < piece.currentShape().length; y++) {
            for (let x = 0; x < piece.currentShape()[y].length; x++) {
                if (
                    piece.currentShape()[y][x].value === BlockType.Using ||
                    piece.currentShape()[y][x].value === BlockType.Obstructed
                ) {
                    if (piece instanceof O) {
                        this.drawTetriminoSquare(
                            {
                                x: BLOCKSIZE * (x + graphicalOffsets.O.x) +
                                    pos.x,
                                y: BLOCKSIZE * (y + graphicalOffsets.O.y) +
                                    pos.y,
                            },
                            piece.currentShape()[y][x].color,
                        );
                    } else if (piece instanceof I) {
                        this.drawTetriminoSquare(
                            {
                                x: BLOCKSIZE * (x + graphicalOffsets.I.x) +
                                    pos.x,
                                y: BLOCKSIZE * (y + graphicalOffsets.I.y) +
                                    pos.y,
                            },
                            piece.currentShape()[y][x].color,
                        );
                    } else {
                        this.drawTetriminoSquare(
                            {
                                x: BLOCKSIZE * (x + graphicalOffsets.JLSTZ.x) +
                                    pos.x,
                                y: BLOCKSIZE * (y + graphicalOffsets.JLSTZ.y) +
                                    pos.y,
                            },
                            piece.currentShape()[y][x].color,
                        );
                    }
                }
            }
        }
    }

    drawPieces(pieces: Piece[]) {
        for (let i = 0; i < pieces.length; i++) {
            this.drawPiece(pieces[i], { x: 0, y: i * BLOCKSIZE * 3 });
        }
    }
}
