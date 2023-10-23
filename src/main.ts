import { Game } from "./Game";
import { ROWS, COLS, BLOCKSIZE } from "./constants";
import "./style.css";

function main() {
    const mainCanvas = document.querySelector<HTMLCanvasElement>(`#game`)!;
    mainCanvas.width = COLS * BLOCKSIZE;
    mainCanvas.height = ROWS * BLOCKSIZE;
    const holdCanvas = document.querySelector<HTMLCanvasElement>(`#hold`)!;
    holdCanvas.width = (4 + 1) * BLOCKSIZE;
    holdCanvas.height = (2 + 1) * BLOCKSIZE;
    const nextCanvas = document.querySelector<HTMLCanvasElement>(`#next`)!;
    nextCanvas.width = (4 + 1) * BLOCKSIZE;
    nextCanvas.height = (6 + 2) * BLOCKSIZE;

    new Game(mainCanvas, holdCanvas, nextCanvas);
}

main();
