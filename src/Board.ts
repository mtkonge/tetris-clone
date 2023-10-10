import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { O, Piece } from "./Pieces";
import { Block, BlockType } from "./Block";
import { COLS, ROWS } from "./constants";
import { Direction } from "./Direction";
import { Matrix2d } from "./Matrix2d";

export class Board {
    private grid: Block[][];
    constructor(private graphics: Graphics) {
        this.grid = new Matrix2d(COLS, ROWS).grid();
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

    getGridPosition(pos: Coordinate, grid: Block[][]): Block {
        let gridPos;
        try {
            gridPos = grid[pos.x][pos.y];
            if (!gridPos) {
                gridPos = { value: BlockType.Obstructed, color: "" };
            }
        } catch {
            gridPos = { value: BlockType.Obstructed, color: "" };
        }
        return gridPos;
    }

    isObstructed(piece: Piece, pos: Coordinate) {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                currentGridPos = this.getGridPosition(
                    { x: pos.x + i, y: pos.y + j },
                    gridClone,
                );
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

    directionToPosition(pos: Coordinate, direction: Direction) {
        let result: Coordinate = pos;
        if (direction === Direction.Down)
            result = {
                x: pos.x,
                y: pos.y + 1,
            };
        else if (direction === Direction.Left)
            result = {
                x: pos.x - 1,
                y: pos.y,
            };
        else if (direction === Direction.Right)
            result = {
                x: pos.x + 1,
                y: pos.y,
            };
        return result;
    }

    setPieceInPos(piece: Piece, pos: Coordinate) {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                currentGridPos = this.getGridPosition(
                    { x: pos.x + i, y: pos.y + j },
                    gridClone,
                );
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
                currentGridPos = this.getGridPosition(
                    { x: pos.x + i, y: pos.y + j },
                    gridClone,
                );

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
                currentGridPos = this.getGridPosition(
                    { x: pos.x + i, y: pos.y + j },
                    this.grid,
                );
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

    getRotatedPiecePos(piece: Piece, pos: Coordinate): Coordinate {
        let currentGridPos;
        currentGridPos = this.getGridPosition(pos, this.grid);
        for (let i = 0; i < piece.shape.length; i++) {
            currentGridPos = this.getGridPosition(
                { x: pos.x, y: pos.y + i },
                this.grid,
            );
            if (currentGridPos.value === BlockType.Obstructed) {
                return this.getRotatedPiecePos(piece, {
                    x: pos.x + 1,
                    y: pos.y,
                });
            }
            currentGridPos = this.getGridPosition(
                { x: pos.x + piece.shape.length - 1, y: pos.y + i },
                this.grid,
            );
            if (currentGridPos.value === BlockType.Obstructed) {
                return this.getRotatedPiecePos(piece, {
                    x: pos.x - 1,
                    y: pos.y,
                });
            }
            currentGridPos = this.getGridPosition(
                { x: pos.x + i, y: pos.y },
                this.grid,
            );
            if (currentGridPos.value === BlockType.Obstructed) {
                return this.getRotatedPiecePos(piece, {
                    x: pos.x,
                    y: pos.y + 1,
                });
            }
            currentGridPos = this.getGridPosition(
                { x: pos.x + i, y: pos.y + piece.shape.length - 1 },
                this.grid,
            );
            if (currentGridPos.value === BlockType.Obstructed) {
                return this.getRotatedPiecePos(piece, {
                    x: pos.x,
                    y: pos.y - 1,
                });
            }
        }
        return pos;
    }

    rotatePiece(piece: Piece, pos: Coordinate) {
        if (piece instanceof O) {
            return;
        }
        this.removePieceInPos(piece, pos);
        piece.rotate();
        const newPiecePos = this.getRotatedPiecePos(piece, pos);
        this.setPieceInPos(piece, newPiecePos);
        return newPiecePos;
    }
}
