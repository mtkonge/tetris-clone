import { Board } from "./Board";
import { FigureOrder } from "./FigureOrder";
import { GameLoop } from "./GameLoop";
import { Graphics } from "./Graphics";
import { I } from "./Pieces";
import { ROWS, COLS, BLOCKSIZE } from "./constants";
import "./style.css";

function main() {
    const canvas = document.querySelector<HTMLCanvasElement>(`#game`)!;
    canvas.width = COLS * BLOCKSIZE;
    canvas.height = ROWS * BLOCKSIZE;
    const board = new Board(new Graphics(canvas));
    const piece = new I();

    const figureOrder = new FigureOrder();
    const startPiecePos = { x: 3, y: 0 };
    let currentPos = startPiecePos;

    function gameIteration(deltaTime: number) {
        board.movePiece(piece, currentPos, {
            x: currentPos.x,
            y: currentPos.y + 1,
        });
        board.draw();
        currentPos.y++;
    }

    let currentFPS = 1;
    const gameLoop = new GameLoop(currentFPS, gameIteration);
}

main();
