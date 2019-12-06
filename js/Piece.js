// Abstract class
export class Piece {

    constructor(x, y, data, missing) {
        if (this.constructor === Piece) {
            // Error: Abstract class can not be constructed.
            throw new TypeError("<Piece>: Can not construct abstract class.");
        }
        // Check if all instance methods are implemented.
        if (this.getX === Piece.prototype.getX) {
            throw new TypeError("<Piece>: Please implement abstract method getX.");
        }
        if (this.setX === Piece.prototype.setX) {
            throw new TypeError("<Piece>: Please implement abstract method setX.");
        }
        if (this.getY === Piece.prototype.getY) {
            throw new TypeError("<Piece>: Please implement abstract method getY.");
        }
        if (this.setY === Piece.prototype.setY) {
            throw new TypeError("<Piece>: Please implement abstract method setY.");
        }
        if (this.setMissing === Piece.prototype.setMissing) {
            throw new TypeError("<Piece>: Please implement abstract method setMissing.");
        }
        
        this.xPos = x;
        this.yPos = y;
        this.data = data;
        this.isMissing = missing;
    }

    // abstract methods
    getX() {
        // Error: The child has implemented this method but also called `super.foo()`.
        throw new TypeError("<Piece.getX>: Do not call abstract method from child.");
    }

    setX(x) {
        throw new TypeError("<Piece.setX>: Do not call abstract method from child.");
    }

    getY() {
        throw new TypeError("<Piece.getY>: Do not call abstract method from child.");
    }

    setY(y) {
        throw new TypeError("<Piece.setY>:Do not call abstract method from child.");
    }

    setMissing(missing) {
        throw new TypeError("<Piece.setMissing>:Do not call abstract method from child.");
    }

}