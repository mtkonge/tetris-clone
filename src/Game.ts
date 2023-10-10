import { Board } from "./Board";
import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { PieceQueue } from "./PieceQueue";
import { COLS } from "./constants";

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

        if (this.board.isObstructed(this.pieceQueue.current(), newPosition)) {
            this.board.obstructPiece(
                this.pieceQueue.current(),
                this.currentPiecePos,
            );
            this.currentPiecePos = {
                x: this.PieceStartPos.x,
                y: this.PieceStartPos.y,
            };
            this.pieceQueue.step();
            this.board.setPieceInPos(
                this.pieceQueue.current(),
                this.currentPiecePos,
            );
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
    // todo clean this mess up
    addKeyboardInputListener() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            let newPosition = this.currentPiecePos;
            if (event.key === "ArrowDown") {
                this.lastTime = Date.now();
                this.runGameIteration();
            } else if (event.key === "ArrowLeft") {
                newPosition = {
                    x: this.currentPiecePos.x - 1,
                    y: this.currentPiecePos.y,
                };
                if (
                    this.board.isObstructed(
                        this.pieceQueue.current(),
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
            } else if (event.key === "ArrowRight") {
                newPosition = {
                    x: this.currentPiecePos.x + 1,
                    y: this.currentPiecePos.y,
                };
                if (
                    this.board.isObstructed(
                        this.pieceQueue.current(),
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
            } else if (event.key === "ArrowUp") {
                this.currentPiecePos = this.board.rotatePiece(
                    this.pieceQueue.current(),
                    this.currentPiecePos,
                )!; // I don't know why it thinks it can be undefined, maybe max call stack reached exception?

                this.board.draw();
            }
        });
    }
}
