import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { I, J, L, O, Piece, S, T, Z } from "./Pieces";
import { Block, BlockType } from "./Block";
import { COLS, ROWS, WALLKICKS } from "./constants";
import { RotationDirection } from "./RotationDirection";
import { Matrix2d } from "./Matrix2d";

interface PieceAndPos {
    piece_: Piece;
    pos: Coordinate;
}

export class Board {
    private grid: Block[][];
    constructor(private graphics: Graphics) {
        this.grid = new Matrix2d(ROWS, COLS).grid();
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

    getGridPosition(pos: Coordinate): Block {
        let gridPos;
        try {
            gridPos = this.grid[pos.y][pos.x];
            if (!gridPos) {
                gridPos = { value: BlockType.Obstructed, color: "" };
            }
        } catch {
            gridPos = { value: BlockType.Obstructed, color: "" };
        }
        return gridPos;
    }

    isUsingPieceObstructed(blocks: Block[][], pos: Coordinate) {
        let currentGridPos: Block;
        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < blocks[i].length; j++) {
                currentGridPos = this.getGridPosition({
                    x: pos.x + j,
                    y: pos.y + i,
                });
                if (
                    blocks[i][j].value === BlockType.Using &&
                    currentGridPos.value === BlockType.Obstructed
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    setPieceInPos(piece: Piece, pos: Coordinate) {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.currentShape().length; i++) {
            for (let j = 0; j < piece.currentShape()[i].length; j++) {
                currentGridPos = this.getGridPosition({
                    x: pos.x + j,
                    y: pos.y + i,
                });
                if (piece.currentShape()[i][j].value === BlockType.Empty) {
                    continue;
                }

                if (piece.currentShape()[i][j].value === BlockType.Using) {
                    currentGridPos.value = piece.currentShape()[i][j].value;
                    currentGridPos.color = piece.currentShape()[i][j].color;
                }
            }
        }
        this.grid = gridClone;
    }

    obstructPiece(piece: Piece, pos: Coordinate): Block[][] {
        let currentGridPos: Block;
        let gridClone = [...this.grid];
        for (let i = 0; i < piece.currentShape().length; i++) {
            for (let j = 0; j < piece.currentShape()[i].length; j++) {
                currentGridPos = this.getGridPosition({
                    x: pos.x + j,
                    y: pos.y + i,
                });

                if (currentGridPos.value === BlockType.Using)
                    currentGridPos.value = BlockType.Obstructed;
            }
        }
        return gridClone;
    }

    removePieceInPos(piece: Piece, pos: Coordinate) {
        let currentGridPos;
        for (let i = 0; i < piece.currentShape().length; i++) {
            for (let j = 0; j < piece.currentShape()[i].length; j++) {
                currentGridPos = this.getGridPosition({
                    x: pos.x + j,
                    y: pos.y + i,
                });
                if (piece.currentShape()[i][j].value === BlockType.Using) {
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

    dropPiece(piece: Piece, pos: Coordinate) {
        let nextPos = { x: pos.x, y: pos.y + 1 };
        while (!this.isUsingPieceObstructed(piece.currentShape(), nextPos)) {
            this.movePiece(piece, pos, nextPos);
            pos.y = nextPos.y;
            nextPos.y++;
        }
    }

    getPosAndPieceAfterWallKickTests(
        piece: Piece,
        pos: Coordinate,
        direction: RotationDirection,
        pieceCategory: "JLSTZ" | "I",
    ) {
        const rotationIndexBefore = piece.currentRotation();
        if (direction === RotationDirection.Clockwise) {
            piece.nextRotationClockwise();
        } else {
            piece.nextRotationAntiClockwise();
        }
        for (let j = 0; j < WALLKICKS[pieceCategory].length; j++) {
            if (
                WALLKICKS[pieceCategory][j].rotation === rotationIndexBefore &&
                WALLKICKS[pieceCategory][j].direction === direction
            ) {
                let newPosition: Coordinate;
                for (
                    let k = 0;
                    k < WALLKICKS[pieceCategory][j].tests.length;
                    k++
                ) {
                    newPosition = {
                        x: pos.x + WALLKICKS[pieceCategory][j].tests[k].x,
                        y: pos.y + WALLKICKS[pieceCategory][j].tests[k].y,
                    };
                    if (
                        !this.isUsingPieceObstructed(
                            piece.currentShape(),
                            newPosition,
                        )
                    ) {
                        return {
                            pos: newPosition,
                            piece_: piece,
                        };
                    }
                }
            }
        }
        if (direction === RotationDirection.Clockwise) {
            piece.nextRotationAntiClockwise();
        } else {
            piece.nextRotationClockwise();
        }
        return { pos: pos, piece_: piece };
    }

    private getRotatedPieceAndPos(
        piece: Piece,
        pos: Coordinate,
        direction: RotationDirection,
    ): PieceAndPos {
        const pieces = [J, L, S, T, Z];
        for (let i = 0; i < pieces.length; i++) {
            if (piece instanceof pieces[i]) {
                return this.getPosAndPieceAfterWallKickTests(
                    piece,
                    pos,
                    direction,
                    "JLSTZ",
                );
            }
        }
        if (piece instanceof I) {
            return this.getPosAndPieceAfterWallKickTests(
                piece,
                pos,
                direction,
                "I",
            );
        }

        return { pos: pos, piece_: piece };
    }

    rotatePiece(piece: Piece, pos: Coordinate, direction: RotationDirection) {
        if (piece instanceof O) {
            return pos;
        }
        this.removePieceInPos(piece, pos);
        const newPieceAndPos = this.getRotatedPieceAndPos(
            piece,
            pos,
            direction,
        );
        this.setPieceInPos(newPieceAndPos.piece_, newPieceAndPos.pos);
        return newPieceAndPos.pos;
    }

    isLineObstructed(line: Block[], pos: Coordinate) {
        let currentGridPos: Block;
        for (let x = 0; x < line.length; x++) {
            currentGridPos = this.getGridPosition({
                x: pos.x + x,
                y: pos.y,
            });
            if (currentGridPos.value === BlockType.Obstructed) {
                return true;
            }
        }
        return false;
    }

    getLine(y: number) {
        let line: Block[] = [];
        for (let x = 0; x < COLS; x++) {
            const currentGridPos = this.getGridPosition({ x, y });
            line.push({
                value: currentGridPos.value,
                color: currentGridPos.color,
            });
        }
        return line;
    }

    dropBoard() {
        for (let i = 0; i < 4; i++) {
            for (let y = ROWS; y >= 1; y--) {
                const currentLine = this.getLine(y - 1);
                if (!this.isLineObstructed(currentLine, { x: 0, y: y })) {
                    this.grid[y - 1] = this.grid[y];
                    this.grid[y] = currentLine;
                }
            }
        }
    }

    isFullLine(y: number) {
        for (let x = 0; x < COLS; x++) {
            const currentGridPos = this.getGridPosition({ x, y });
            if (currentGridPos.value !== BlockType.Obstructed) {
                return false;
            }
        }
        return true;
    }

    clearLine(y: number) {
        for (let x = 0; x < COLS; x++) {
            this.grid[y][x].value = BlockType.Empty;
        }
    }

    clearFullLines() {
        for (let y = 0; y < ROWS; y++) {
            if (this.isFullLine(y)) {
                this.clearLine(y);
            }
        }
    }

    clearAndDropLines() {
        this.clearFullLines();
        this.dropBoard();
    }
}
