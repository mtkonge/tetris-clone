import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { Piece } from "./Pieces";
import { Block, BlockType } from "./Block";
import { COLS, ROWS } from "./constants";

export class Board {
    private grid: Block[][];
    constructor(private graphics: Graphics) {
        this.grid = this.getEmptyBoard();
        console.table(this.grid);
        this.draw();
    }

    consoleTable() {
        console.table(this.grid);
    }

    draw() {
        this.graphics.clear();
        this.graphics.drawBoard(this.grid);
    }

    getEmptyBoard(): Block[][] {
        const emptyGrid = Array.from({ length: COLS }, () => Array(ROWS));
        for (let i = 0; i < emptyGrid.length; i++) {
            for (let j = 0; j < emptyGrid[i].length; j++) {
                emptyGrid[i][j] = { value: BlockType.Empty, color: "" };
            }
        }
        return emptyGrid;
    }

    isObstructed(piece: Piece, pos: Coordinate) {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                currentGridPos = gridClone[pos.x + j][pos.y + i];
                if (piece.shape[i][j].value === BlockType.Using) {
                    if (
                        !currentGridPos ||
                        currentGridPos.value === BlockType.Obstructed
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    setPieceInPos(piece: Piece, pos: Coordinate) {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                currentGridPos = gridClone[pos.x + j][pos.y + i];

                if (
                    !currentGridPos &&
                    piece.shape[i][j].value === BlockType.Empty
                ) {
                    continue;
                }

                if (piece.shape[i][j].value === BlockType.Using) {
                    currentGridPos.value = piece.shape[i][j].value;
                    currentGridPos.color = piece.shape[i][j].color;
                }
            }
        }
        this.grid = gridClone;
    }

    obstructPiece(piece: Piece, pos: Coordinate): Block[][] {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                currentGridPos = gridClone[pos.x + j][pos.y + i];
                if (!currentGridPos) continue;
                if (currentGridPos.value === BlockType.Using)
                    currentGridPos.value = BlockType.Obstructed;
            }
        }
        return gridClone;
    }

    removePieceInPos(piece: Piece, pos: Coordinate) {
        let currentGridPos;
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                currentGridPos = this.grid[pos.x + j][pos.y + i];
                if (piece.shape[i][j].value === BlockType.Using) {
                    currentGridPos.value = BlockType.Empty;
                    currentGridPos.color = "";
                }
            }
        }
    }

    movePiece(piece: Piece, from: Coordinate, to: Coordinate) {
        this.removePieceInPos(piece, from);
        this.setPieceInPos(piece, to);
    }
}
