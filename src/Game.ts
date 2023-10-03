import { Board } from "./Board";
import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { PieceOrder } from "./PieceOrder";

export class Game {
    private fps: number;
    private interval: number;
    private lastTime: number;
    private board: Board;
    private PieceStartPos: Coordinate = { x: 3, y: 0 };
    private currentPiecePos: Coordinate;
    private pieceOrder: PieceOrder = new PieceOrder();
    constructor(canvas: HTMLCanvasElement) {
        this.currentPiecePos = { ...this.PieceStartPos };
        this.board = new Board(new Graphics(canvas));
        this.fps = 3;
        this.interval = 1000 / this.fps;
        this.lastTime = 0;
        this.update();
    }
    private update() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTime;

        if (deltaTime >= this.interval) {
            this.gameIteration(deltaTime);
            this.lastTime = currentTime - (deltaTime % this.interval);
        }

        requestAnimationFrame(this.update.bind(this));
    }
    gameIteration(deltaTime: number) {
        const nextPosition = {
            x: this.currentPiecePos.x,
            y: this.currentPiecePos.y + 1,
        };
        if (this.board.isObstructed(this.pieceOrder.order[0], nextPosition)) {
            this.board.obstructPiece(
                this.pieceOrder.order[0],
                this.currentPiecePos,
            ),
                (this.currentPiecePos = {
                    x: this.PieceStartPos.x,
                    y: this.PieceStartPos.y,
                });
            this.pieceOrder.next();
            this.board.setPieceInPos(
                this.pieceOrder.order[0],
                this.currentPiecePos,
            );
        } else {
            this.board.movePiece(
                this.pieceOrder.order[0],
                this.currentPiecePos,
                nextPosition,
            );
            this.currentPiecePos.y++;
        }
        this.board.draw();
    }
}
