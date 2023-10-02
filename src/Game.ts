import { Board } from "./Board";
import { Coordinate } from "./Coordinate";
import { Graphics } from "./Graphics";
import { Piece, I, J } from "./Pieces";

export class Game {
    private fps: number;
    private interval: number;
    private lastTime: number;
    private board: Board;
    private PieceStartPos: Coordinate = { x: 3, y: 0 };
    private currentPiecePos: Coordinate;
    private currentPiece: Piece = new I();

    constructor(canvas: HTMLCanvasElement) {
        this.currentPiecePos = { ...this.PieceStartPos };
        this.board = new Board(new Graphics(canvas));
        this.fps = 1;
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
        if (
            !this.board.movePieceIfNotObstructed(
                this.currentPiece,
                this.currentPiecePos,
                {
                    x: this.currentPiecePos.x,
                    y: this.currentPiecePos.y + 1,
                },
            )
        ) {
            this.currentPiecePos = {
                x: this.PieceStartPos.x,
                y: this.PieceStartPos.y,
            };
            this.currentPiece = new I();
            this.board.draw();
        }
        this.board.draw();
        this.currentPiecePos.y++;
    }
}
