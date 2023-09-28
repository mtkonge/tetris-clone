export class Piece {
    private shape: number[][] = []

    constructor(gridSize: number) {
        this.shape = this.emptyShape(gridSize)
        console.log(this.shape)
    }

    emptyShape(gridSize: number) {
        return Array.from({length: gridSize}, () => Array(gridSize).fill(0))
    }
}

class I extends Piece {
    constructor() {
        super(4)
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
