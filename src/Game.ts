import { MainBoard, HoldBoard, NextBoard } from "./Board";
import { Coordinate } from "./Coordinate";
import { PieceQueue } from "./PieceQueue";
import { RotationDirection } from "./RotationDirection";

export class Game {
    private fps: number;
    private interval: number;
    private lastTime: number;
    private mainBoard: MainBoard;
    private holdBoard: HoldBoard;
    private nextBoard: NextBoard;
    private pieceStartPos: Coordinate = { x: 3, y: 0 };
    private currentPiecePos: Coordinate;
    private pieceQueue: PieceQueue = new PieceQueue();
    private hasSwitched = false;
    constructor(
        mainCanvas: HTMLCanvasElement,
        holdCanvas: HTMLCanvasElement,
        nextCanvas: HTMLCanvasElement,
    ) {
        this.currentPiecePos = { ...this.pieceStartPos };
        this.mainBoard = new MainBoard(mainCanvas);
        this.holdBoard = new HoldBoard(holdCanvas);
        this.nextBoard = new NextBoard(nextCanvas);
        this.fps = 1;
        this.interval = 1000 / this.fps;
        this.lastTime = Date.now();
        this.mainBoard.setPieceInPos(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.mainBoard.draw();
        this.update();
        this.addKeyboardInputListener();
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
        } else {
            this.mainBoard.movePiece(
                this.pieceQueue.current(),
                this.currentPiecePos,
                newPosition,
            );
            this.currentPiecePos.y++;
        }
        this.mainBoard.draw();
    }

    nextPiece() {
        this.mainBoard.obstructPiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.mainBoard.clearAndDropLines();
        this.currentPiecePos = { ...this.pieceStartPos };
        this.pieceQueue.step();
        this.hasSwitched = false;
        this.mainBoard.setPieceInPos(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
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
        )
            return;
        this.mainBoard.movePiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
            newPosition,
        );
        this.currentPiecePos = newPosition;
        this.mainBoard.draw();
    }
    addKeyboardInputListener() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === "ArrowDown") {
                this.lastTime = Date.now();
                this.runGameIteration();
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
                if (this.hasSwitched) return;
                this.mainBoard.removePieceInPos(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.pieceQueue.switch();
                this.currentPiecePos = { ...this.pieceStartPos };
                this.mainBoard.setPieceInPos(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.hasSwitched = true;
                this.mainBoard.draw();
                this.holdBoard.drawPiece(this.pieceQueue.holding()!);
            } else if (event.key === " ") {
                this.mainBoard.dropPiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.nextPiece();
                this.mainBoard.draw();
            }
        });
    }
}
