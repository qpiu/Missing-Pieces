import { PicturePiece } from "./PicturePiece.js";

export class Picture {
    constructor() {
        console.log("new game picture");
        this.pieceDim = 100; // 100px * 100px for each piece
    }

    setReadFileHandler(cb_begingame) {
        const imageLoader = document.getElementById('file');
        const this_picture = this;
        const img = new Image();
        let imgData;
        this.picture = img;
        imageLoader.addEventListener('change', handleImage, false);

        function handleImage(e) {
            const canvas = document.getElementById('_game-canvas');
            const ctx = canvas.getContext('2d');
            const reader = new FileReader();
            reader.onload = function (event) {
                //let img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    imgData = ctx.getImageData(0, 0, img.width, img.height);
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas after I have got imgData
                    this_picture.picture = img;
                    this_picture.pictureW = img.width;
                    this_picture.pictureH = img.height;
                    this_picture.pictureData = imgData;
                    this_picture.generatePieces(cb_begingame);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            TweenMax.to("#load-image-container", .5, { display: "none", opacity: "0", ease: Power2.easeInOut });
            //cb_begingame(); // begin_game after the image has loaded
        }
    }

    //get imgdata index from img px positions
    indexX(x) {
        var i = x * 4;
        if (i > this.pictureData.data.length) console.warn("X out of bounds");
        return i;
    }
    indexY(y) {
        var i = this.pictureW * 4 * y;
        if (i > this.pictureData.data.length) console.warn("Y out of bounds");
        return i;
    }
    getIndex(x, y) {
        var i = this.indexX(x) + this.indexY(y);
        if (i > this.pictureData.data.length) console.warn("XY out of bounds");
        return i;
    }

    // get a piece of size pieceDim * pieceDim from position x,y
    getPieceData(x, y) {
        let data = [];
        //loop over rows
        for (let i = 0; i < this.pieceDim; i++) {
            data.push(...this.pictureData.data.slice(this.getIndex(x, y + i), this.getIndex(x + this.pieceDim, y + i)));
        }
        //convert back to typed array and to imgdata object
        data = new ImageData(new Uint8ClampedArray(data), this.pieceDim, this.pieceDim);
        //save original position
        data.x = x;
        data.y = y;

        return data;
    }

    generatePieces(cb_begingame) {
        console.log("generate pieces");
        const pCountX = this.pictureW / this.pieceDim;
        const pCountY = this.pictureH / this.pieceDim;
        let pieces = [];
        let count = 0;
        for (let yi = 0; yi < pCountY; yi++) {
            for (let xi = 0; xi < pCountX; xi++) {
                let piece_x = xi * this.pieceDim;
                let piece_y = yi * this.pieceDim;
                let data = this.getPieceData(piece_x, piece_y);
                let p = new PicturePiece(piece_x, piece_y, data, false); // if random number equals 1, set this piece to be missing 
                //let p = new PicturePiece(piece_x, piece_y, data, (yi==2 && xi===3));
                pieces.push(p);
            }
        }

        // randomly choose 3 missing pieces
        for(let i = 0; i < 3; i++) {
            let missing = pieces[Math.floor(Math.random()*pieces.length)];
            missing.setMissing(true);
        }
        
        this.picturePieces = pieces;
        this.drawPieces(cb_begingame);
    }

    drawPieces(cb_begingame) {
        const picturePiecesMissing = []
        this.picturePieces.forEach((p, i) => {
            p.draw();
            if (p.isMissing) {
                picturePiecesMissing.push(p);
            }
        });
        this.picturePiecesMissing = picturePiecesMissing;
        // console.log(this.picturePiecesMissing);
        if(cb_begingame) {
            cb_begingame();
        }
    }

    getCurrentMissing() {
        if(this.picturePiecesMissing.length > 0) {
            return this.picturePiecesMissing[0];
        } else {
            return null;
        }
    }

}