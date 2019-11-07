
export class PicturePiece {
    constructor(x, y, data, missing) {
        //console.log(`new piece (${x}, ${y}), ${missing}`);
        this.xPos = x;
        this.yPos = y;
        this.data = data;
        this.isMissing = missing;
    }

    draw() {
        const canvas = document.getElementById('_game-canvas');
        const ctx = canvas.getContext('2d');
        if (!this.isMissing) {
            ctx.putImageData(this.data, this.xPos, this.yPos);
        } else {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, this.xPos, this.yPos, 60, 60); // Or at whatever offset you like
            };
            img.src = "./img/missing.jpg";
        }

    }
}