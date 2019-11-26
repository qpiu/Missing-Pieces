import { Piece } from "./Piece.js";

export class PicturePiece extends Piece{
    constructor(x, y, data, missing) {
        super(x, y, data, missing);
        this.url = ""
        this.canvas_holder_id = null
    }

    getX() {
        return this.xPos;
    }

    setX(x) {
        this.xPos = x;
    }

    getY() {
        return this.yPos;
    }

    setY(y) {
        this.yPos = y;
    }

    setMissing(missing) {
        this.isMissing = missing;
    }

    draw() {
        const canvas = document.getElementById('_game-canvas');
        const ctx = canvas.getContext('2d');
        if (!this.isMissing) {
            for (let i = 0; i < this.data.data.length; i += 4) {
                this.data.data[i + 3] = 180; // set the alpha value of the pieces in place
            }
            ctx.putImageData(this.data, this.xPos, this.yPos);
        } else {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, this.xPos, this.yPos, 100, 100);
            };
            img.src = "./img/missing.jpg";

            if (!this.canvas_holder_id) {
                const canvas_container = document.getElementById('piece-container');
                const _canvas = document.createElement('canvas');
                _canvas.setAttribute("id", "_game_piece_holder_" + this.xPos + "_" + this.yPos);
                // _canvas.setAttribute("width", "100");
                // _canvas.setAttribute("height", "100");
                // canvas_container.appendChild(_canvas);
                this.canvas_holder_id = _canvas.getAttribute("id");
                // const _ctx = _canvas.getContext('2d');
                // _ctx.putImageData(this.data, 0, 0);

                /* Resize the picture piece */
                const hidden_canvas = document.getElementById('_hidden_canvas');
                const hidden_ctx = hidden_canvas.getContext('2d');
                hidden_ctx.fillStyle = "white";
                hidden_ctx.fill();
                hidden_ctx.putImageData(this.data, 25, 100);
                const dataURL = hidden_canvas.toDataURL();

                /* Upload to IMGUR */
                var form = new FormData();
                form.append("image", dataURL.split(',')[1]);
                form.append('type', "base64");

                var settings = {
                    "url": "https://api.imgur.com/3/image",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Client-ID a113a683e5ab081"
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form,
                    //"async": false
                };

                $.ajax(settings).done((response) => {
                    let resp_json = JSON.parse(response);
                    //console.log(resp_json.data.link);
                    this.url = resp_json.data.link;
                });
            }

        }

    }
}