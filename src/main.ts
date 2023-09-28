import { Board } from './Board'
import { FigureOrder } from './FigureOrder'
import { Graphics } from './Graphics'
import { Piece } from './Pieces'
import {ROWS, COLS, BLOCKSIZE} from './constants'
import './style.css'

function main() {
    const canvas = document.querySelector<HTMLCanvasElement>(`#game`)!
    canvas.width = COLS*BLOCKSIZE
    canvas.height = ROWS*BLOCKSIZE
    const board = new Board(new Graphics(canvas))
    const piece = new Piece(3)

    
    
    const figureOrder = new FigureOrder()
    
}

main()