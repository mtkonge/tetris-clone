import { Board } from "./Board";
import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { PieceQueue } from "./PieceQueue";
import { RotationDirection } from "./RotationDirection";

export class Game {
    private fps: number;
    private interval: number;
    private lastTime: number;
    private board: Board;
    private PieceStartPos: Coordinate = { x: 3, y: 0 };
    private currentPiecePos: Coordinate;
    private pieceQueue: PieceQueue = new PieceQueue();
    constructor(canvas: HTMLCanvasElement) {
        this.currentPiecePos = { ...this.PieceStartPos };
        this.board = new Board(new Graphics(canvas));
        this.fps = 1;
        this.interval = 1000 / this.fps;
        this.lastTime = Date.now();
        this.board.setPieceInPos(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.board.draw();
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
            this.board.isUsingPieceObstructed(
                this.pieceQueue.current().currentShape(),
                newPosition,
            )
        ) {
            this.nextPiece();
        } else {
            this.board.movePiece(
                this.pieceQueue.current(),
                this.currentPiecePos,
                newPosition,
            );
            this.currentPiecePos.y++;
        }
        this.board.draw();
    }

    nextPiece() {
        this.board.obstructPiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
        );
        this.board.clearAndDropLines();
        this.currentPiecePos = {
            x: this.PieceStartPos.x,
            y: this.PieceStartPos.y,
        };
        this.pieceQueue.step();
        this.board.setPieceInPos(
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
            this.board.isUsingPieceObstructed(
                this.pieceQueue.current().currentShape(),
                newPosition,
            )
        )
            return;
        this.board.movePiece(
            this.pieceQueue.current(),
            this.currentPiecePos,
            newPosition,
        );
        this.currentPiecePos = newPosition;
        this.board.draw();
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
                this.currentPiecePos = this.board.rotatePiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                    RotationDirection.Clockwise,
                );
                this.board.draw();
            } else if (event.key === "z") {
                this.currentPiecePos = this.board.rotatePiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                    RotationDirection.CounterClockwise,
                );
                this.board.draw();
            } else if (event.key === " ") {
                this.board.dropPiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                );
                this.nextPiece();
                this.board.draw();
            }
        });
    }
}
