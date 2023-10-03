import { Game } from "./Game";
import { ROWS, COLS, BLOCKSIZE } from "./constants";
import "./style.css";

function main() {
    const canvas = document.querySelector<HTMLCanvasElement>(`#game`)!;
    canvas.width = COLS * BLOCKSIZE;
    canvas.height = ROWS * BLOCKSIZE;
    new Game(canvas);
}

main();
