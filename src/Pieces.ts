export class Piece {
    public shape: number[][] = []

    constructor(gridSize: number) {
        this.shape = this.emptyShape(gridSize)
    }

    emptyShape(gridSize: number) {
        return Array.from({length: gridSize}, () => Array(gridSize).fill(0))
    }
}

export class I extends Piece {
    constructor() {
        super(4)
        this.generatePiece()
    }

    generatePiece() {
        for(let i = 0; i < this.shape.length; i++)
            this.shape[i][1] = 1
    }
}

class J extends Piece {
    constructor() {
        super(3)
    }
}
class L extends Piece {
    constructor() {
        super(3)
    }
}

class O extends Piece {
    constructor() {
        super(4)
    }
}
