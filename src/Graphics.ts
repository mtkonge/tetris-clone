import { Coordinate } from "./Coordinate"

export class Graphics {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    constructor(id: string) {
        this.canvas = document.querySelector<HTMLCanvasElement>(`#${id}`)!
        this.context =  this.canvas.getContext("2d")!
        this.backgroundColor("#2d2d35")
    }

    update() {

    }
    
    backgroundColor(color: string) {
        this.context.fillStyle = color
        this.context.fillRect(0, 0,this.canvas.width, this.canvas.height)
    }

    drawSquare(pos: Coordinate, color: string) {
        this.context.fillStyle = color
        this.context.fillRect(pos.x, pos.y, this.canvas.width/10, this.canvas.width/10)
    }

    drawRectangle(pos: Coordinate, color: string) {
        this.context.fillStyle = color
        for(let i = 0; i < 4; i++)
            this.context.fillRect(pos.x, pos.y+i*(this.canvas.width/10), this.canvas.width/10, this.canvas.width/10)
    }
}