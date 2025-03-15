import { HoldBoard, MainBoard, NextBoard } from "./Board";
import { Coordinate } from "./Coordinate";
import { PieceQueue } from "./PieceQueue";
import { RotationDirection } from "./RotationDirection";

export class Game {
    private levelUI = document.querySelector<HTMLParagraphElement>("#level")!;
    private level: number = 1;
    private scoreUI = document.querySelector<HTMLParagraphElement>("#score")!;
    private score: number = 0;
    private linesUI = document.querySelector<HTMLParagraphElement>("#lines")!;
    private lines = 0;
    private lastTime: number;
    private mainBoard: MainBoard;
    private holdBoard: HoldBoard;
    private nextBoard: NextBoard;
    private pieceStartPos: Coordinate = { x: 3, y: 0 };
    private currentPiecePos: Coordinate;
    private pieceQueue: PieceQueue = new PieceQueue();
    private hasSwapped = false;
    private interval: number;
    private milisecondsPassed = Date.now();
    private milisecondsTilNextLevel = 30000;

    constructor(
        mainCanvas: HTMLCanvasElement,
        holdCanvas: HTMLCanvasElement,
        nextCanvas: HTMLCanvasElement,
    ) {
        this.currentPiecePos = { ...this.pieceStartPos };
        this.mainBoard = new MainBoard(mainCanvas);
        this.holdBoard = new HoldBoard(holdCanvas);
        this.nextBoard = new NextBoard(nextCanvas);
        this.nextBoard.drawPieces(this.pieceQueue.nextThree());
        this.lastTime = Date.now();
        this.mainBoard.setPieceInPos(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.interval = Math.round(this.getUpdatedInterval());
        this.mainBoard.setHighlightedDroppedPiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.mainBoard.draw();
        this.update();
        this.addKeyboardInputListener();
    }

    private getUpdatedInterval() {
        const interval = 1000 /
            (Math.sqrt(this.level) * 0.7 +
                0.25 +
                (this.level * 0.1) ** 2 +
                0.04);
        return interval;
    }

    private update() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTime;

        if (deltaTime >= this.interval) {
            this.runGameIteration();
            this.lastTime = currentTime - (deltaTime % this.interval);
        }

        requestAnimationFrame(this.update.bind(this));
    }

    runGameIteration() {
        const newPosition = {
            x: this.currentPiecePos.x,
            y: this.currentPiecePos.y + 1,
        };

        if (
            this.mainBoard.isUsingPieceObstructed(
                this.pieceQueue.current().currentShape(),
                newPosition,
            )
        ) {
            this.nextPiece();
            this.mainBoard.draw();
        } else {
            this.mainBoard.movePiece(
                this.pieceQueue.current(),
                this.currentPiecePos,
                newPosition,
            );
            this.currentPiecePos.y++;
            this.mainBoard.draw();
            return "not obstructed";
        }
    }

    nextPiece() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.milisecondsPassed;
        if (deltaTime >= this.milisecondsTilNextLevel) {
            this.level++;
            this.milisecondsPassed = Date.now();
        }
        this.levelUI.innerHTML = this.level.toString();
        this.interval = this.getUpdatedInterval();
        this.mainBoard.obstructPiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        const linesCleared = this.mainBoard.clearAndDropLines();
        this.updateScore(Math.round(linesCleared ** 1.5) * 100 * this.level);
        this.updateLines(linesCleared);
        this.currentPiecePos = { ...this.pieceStartPos };
        this.pieceQueue.step();
        this.hasSwapped = false;
        this.mainBoard.setPieceInPos(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.mainBoard.setHighlightedDroppedPiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.nextBoard.drawPieces(this.pieceQueue.nextThree());
    }

    moveHorizontal(coordinateXChange: number) {
        const newPosition = {
            x: this.currentPiecePos.x + coordinateXChange,
            y: this.currentPiecePos.y,
        };
        if (
            this.mainBoard.isUsingPieceObstructed(
                this.pieceQueue.current().currentShape(),
                newPosition,
            )
        ) {
            return;
        }
        this.mainBoard.removeHighlightedDroppedPiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.mainBoard.setHighlightedDroppedPiece(
            this.pieceQueue.current(),
            newPosition,
        );
        this.mainBoard.movePiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
            newPosition,
        );
        this.currentPiecePos = newPosition;
        this.mainBoard.draw();
    }

    updateScore(points: number) {
        this.score += points;
        this.scoreUI.innerHTML = this.score.toString();
    }

    updateLines(lines: number) {
        this.lines += lines;
        this.linesUI.innerHTML = this.lines.toString();
    }

    addKeyboardInputListener() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === "ArrowDown") {
                this.lastTime = Date.now();
                if (this.runGameIteration() === "not obstructed") {
                    this.updateScore(1);
                }
            } else if (event.key === "ArrowLeft") {
                this.moveHorizontal(-1);
            } else if (event.key === "ArrowRight") {
                this.moveHorizontal(1);
            } else if (event.key === "ArrowUp" || event.key === "x") {
                this.currentPiecePos = this.mainBoard.rotatePiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                    RotationDirection.Clockwise,
                );
                this.mainBoard.draw();
            } else if (event.key === "z") {
                this.currentPiecePos = this.mainBoard.rotatePiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                    RotationDirection.CounterClockwise,
                );
                this.mainBoard.draw();
            } else if (event.key === "c") {
                if (this.hasSwapped) return;
                this.mainBoard.removeHighlightedDroppedPiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.mainBoard.removeUsingPieceInPos(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.pieceQueue.switch();
                this.currentPiecePos = { ...this.pieceStartPos };
                this.mainBoard.setHighlightedDroppedPiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.mainBoard.setPieceInPos(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );

                this.hasSwapped = true;

                this.mainBoard.draw();
                this.holdBoard.drawPiece(this.pieceQueue.holding()!);
            } else if (event.key === " ") {
                const points = this.mainBoard.dropPiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.updateScore(points * 2);
                this.nextPiece();
                this.mainBoard.draw();
            }
        });
    }
}
