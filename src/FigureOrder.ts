import { Figure } from "./Figure"

export class FigureOrder {
    private figures: Figure[] = []
    private order: Figure[] = []
    constructor() {
        this.generateOrder()
        this.generateOrder()
    }
    
    generateFigures() {
        const keys = Object.keys(Figure).filter((v) => isNaN(Number(v))) 
        keys.forEach((value, index) => {
            this.figures.push(index)
        })
    }
    
    generateOrder() {
        this.generateFigures()
        let randomNumber = 0
        for(let i = this.figures.length; i > 0; i--) {
            randomNumber = Math.floor(Math.random() * this.figures.length)
            this.order.push(this.figures[randomNumber])
            this.figures.splice(randomNumber, 1)
        }
    }

    next() {
        this.figures.splice(0, 1)
        if (this.order.length <= 7) {
            this.generateOrder()
        }
    }
}

