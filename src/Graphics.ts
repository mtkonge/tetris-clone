import { Coordinate } from "./Coordinate"
import "./constants"
import { BLOCKSIZE } from "./constants"

export class Graphics { 
    private context: CanvasRenderingContext2D
    constructor(private canvas: HTMLCanvasElement) {
        this.context =  this.canvas.getContext("2d")!
        this.clear()
    }
    clear() {
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawSquare(pos: Coordinate, color: string) {
        this.context.fillStyle = color
        this.context.fillRect(pos.x, pos.y, BLOCKSIZE, BLOCKSIZE)
    }

    drawRectangle(pos: Coordinate, color: string) {
        this.context.fillStyle = color
        for(let i = 0; i < 4; i++)
            this.context.fillRect(pos.x, pos.y+i*(BLOCKSIZE), BLOCKSIZE, BLOCKSIZE)
    }

    drawFigureI(pos: Coordinate) {
        const color = "#00DDFF"
        for(let i = 0; i < 4; i++)
            this.drawSquare({x: pos.x, y: pos.y+i*BLOCKSIZE}, color)
    }

    drawFigureJ(pos: Coordinate) {
        const color = "#0000FF"
        for(let i = 0; i < 3; i++)
            this.drawSquare({x: pos.x+BLOCKSIZE, y: pos.y+i*BLOCKSIZE}, color)
        this.drawSquare({x: pos.x, y: pos.y+BLOCKSIZE*2}, color)
    }
    drawFigureL(pos: Coordinate) {
        const color = "#FFAA00"
        for(let i = 0; i < 3; i++)
            this.drawSquare({x: pos.x, y: pos.y+i*BLOCKSIZE}, color)
        this.drawSquare({x: pos.x+BLOCKSIZE, y: pos.y+BLOCKSIZE*2}, color)
    }
    drawFigureO(pos: Coordinate) {
        const color = "#DDDD00"
        for(let i = 0; i < 2; i++) {
            this.drawSquare({x: pos.x, y: pos.y+i*BLOCKSIZE}, color)
            this.drawSquare({x: pos.x+BLOCKSIZE, y: pos.y+i*BLOCKSIZE}, color)
        }
    }
    drawFigureS(pos: Coordinate) {
        const color = "#FF0088"
        for(let i = 0; i < 2; i++) {
            this.drawSquare({x: pos.x+BLOCKSIZE-i*BLOCKSIZE, y: pos.y+i*BLOCKSIZE}, color)
            this.drawSquare({x: pos.x+BLOCKSIZE*2-i*BLOCKSIZE, y: pos.y+i*BLOCKSIZE}, color)
        }
    }
    drawFigureZ(pos: Coordinate) {
        const color = "#00FF00"
        for(let i = 0; i < 2; i++) {
            this.drawSquare({x: pos.x+i*BLOCKSIZE, y: pos.y+i*BLOCKSIZE}, color)
            this.drawSquare({x: pos.x+BLOCKSIZE+i*BLOCKSIZE, y: pos.y+i*BLOCKSIZE}, color)
        }
    }

}