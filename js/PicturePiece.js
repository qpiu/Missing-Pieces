
export class PicturePiece {
    constructor(x, y, data, missing) {
        //console.log(`new piece (${x}, ${y}), ${missing}`);
        this.xPos = x;
        this.yPos = y;
        this.data = data;
        this.isMissing = missing;
        this.url = ""
        this.canvas_holder = null
    }

    draw() {
        const canvas = document.getElementById('_game-canvas');
        const ctx = canvas.getContext('2d');
        if (!this.isMissing) {
            ctx.putImageData(this.data, this.xPos, this.yPos);
        } else {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, this.xPos, this.yPos, 100, 100);
            };
            img.src = "./img/missing.jpg";

            const canvas_container = document.getElementById('piece-container');
            const _canvas = document.createElement('canvas');
            _canvas.setAttribute("id", "_game_piece_holder_" + this.xPos + "_" + this.yPos);
            _canvas.setAttribute("width", "100");
            _canvas.setAttribute("height", "100");
            canvas_container.appendChild(_canvas);
            this.canvas_holder = _canvas;
            const _ctx = _canvas.getContext('2d');
            _ctx.putImageData(this.data, 0, 0);

            const hidden_canvas = document.getElementById('_hidden_canvas');
            const hidden_ctx = hidden_canvas.getContext('2d');
            hidden_ctx.fillStyle = "white";
            hidden_ctx.fill();
            hidden_ctx.putImageData(this.data, 25, 100);
            const dataURL = hidden_canvas.toDataURL();
            //console.log(dataURL);


            /* IMGUR */
            var form = new FormData();
            form.append("image", dataURL.split(',')[1]);
            form.append('type', "base64");

            var settings = {
                "url": "https://api.imgur.com/3/image",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Client-ID 34d61f6be6aea19"
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