import { gamestage } from './Utils.js';

class Position {
    constructor(x, y) {
        //console.log(`new Pos(${x}, ${y})`);
        this.x = x;
        this.y = y;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    toString() {
        return '(x:' + this.getX() + ',' + 'y:' + this.getY() + ')';
    }
}

export class Player {
    constructor(game) {
        console.log("new player device");
        this.game = game;
        this.realCanvasOrigin = new Position(-1, -1); // top left position of the space
        this.realCanvasSize = new Position(-1, -1);   // bottom right position of the space
        this.realCurrentPosition = new Position(-1, -1); // current position in the space
        this.canvasPosition = new Position(-1, -1); // current position mapped to the canvas
    }

    phoneConnect(ip) {
        this.device = new tramontana();
        this.device.start(ip, (e) => {
            this.device.makeVibrate();
            this.device.subscribeTouch(() => this.phoneTouchHandler());
            //TweenMax.to("#connect-container h2", 1, { opacity: "0", ease: Power2.easeInOut });
            const btn_el = document.querySelector("#phone-connect-input button");
            // btn_el.removeEventListener('click', connectBtnClicked);
            const new_btn_el = btn_el.cloneNode(true);
            btn_el.parentNode.replaceChild(new_btn_el, btn_el);
            new_btn_el.style.backgroundColor = "#cccccc";
            new_btn_el.style.color = "#ffffff";
            new_btn_el.textContent = "Connected";
            const input_el = document.querySelector("#phone-connect-input input");
            input_el.setAttribute("readonly", "readonly");
        });
    }

    sensorConnect(ip) {
        this.sensor_address = "http://" + ip;
        $.get(this.sensor_address, (data, status) => {
            console.log("Connecting to sensor");
            console.log(data);
            if (status === "success") {
                console.log("sensor connected");
                const btn_el = document.querySelector("#sensor-connect-input button");
                const new_btn_el = btn_el.cloneNode(true);
                btn_el.parentNode.replaceChild(new_btn_el, btn_el);
                new_btn_el.style.backgroundColor = "#cccccc";
                new_btn_el.style.color = "#ffffff";
                new_btn_el.textContent = "Connected";
                const input_el = document.querySelector("#sensor-connect-input input");
                input_el.setAttribute("readonly", "readonly");
                this.game.beginCalibration_1();
            }
        });
    }

    phoneTouchHandler() {
        console.log(this.game.stage + ' touch!');
        const current_stage = this.game.stage;
        switch (current_stage) {
            case gamestage.CALIB_1:
                // record x, y position
                $.get(this.sensor_address, (data, status) => {
                    this.realCanvasOrigin.setX(data.x);
                    this.realCanvasOrigin.setY(data.y);
                    console.log(this.realCanvasOrigin);
                    $('#message-c1').append('<p>' + this.realCanvasOrigin.toString() + '</p>')
                });
                this.game.beginCalibration_2();
                break;
            case gamestage.CALIB_2:
                // record x, y position
                $.get(this.sensor_address, (data, status) => {
                    this.realCanvasSize.setX(data.x);
                    this.realCanvasSize.setY(data.y);
                    console.log(this.realCanvasSize);
                    $('#message-c2').append('<p>' + this.realCanvasSize.toString() + '</p>')
                });
                //this.game.beginGame(this);
                this.game.loadGameImage(this);
                break;
            case gamestage.BEGIN_GAME:
                // check if the player's position on canvas is within the correct area of the current piece
                let x = this.canvasPosition.getX();
                let y = this.canvasPosition.getY();
                let p_x = this.game.gamePicture.getCurrentMissing().xPos;
                let p_y = this.game.gamePicture.getCurrentMissing().yPos;
                console.log(`(${x}, ${y}) | (${p_x}, ${p_y})`)
                if (x >= p_x && x <= p_x + 100 &&
                    y >= p_y && y <= p_y + 100) {
                    console.log("Correct Position!");
                    this.game.gamePicture.getCurrentMissing().isMissing = false;
                    $("#"+this.game.gamePicture.getCurrentMissing().canvas_holder_id).remove();
                } else {
                    console.log("Wrong Position!");
                }
                break;
        }
    }

    mapPosition(curPos) {
        // map position to canvas (600px * 600px)
        let canvasX = curPos.getX() / (this.realCanvasSize.getX()-this.realCanvasOrigin.getX()) * 600;
        let canvasY = curPos.getY() / (this.realCanvasSize.getY()-this.realCanvasOrigin.getY()) * 600;
        this.canvasPosition.setX(canvasX);
        this.canvasPosition.setY(canvasY);
        $('.player-position #canvas-pos-x').val(this.canvasPosition.getX());
        $('.player-position #canvas-pos-y').val(this.canvasPosition.getY());
    }

    showPosition() {
        const canvas = this.game.game_canvas;
        const ctx = canvas.getContext('2d');
        const pin = new Image();
        pin.onload = () => {
            ctx.drawImage(pin, this.canvasPosition.getX()-32, this.canvasPosition.getY()-64, 64, 64);
        };
        pin.src = "./img/player-64.png";
    }

    updatePosition() {
        $.get(this.sensor_address, (data, status) => {
            this.realCurrentPosition.setX(data.x - this.realCanvasOrigin.getX());
            this.realCurrentPosition.setY(data.y - this.realCanvasOrigin.getY());
            $('.player-position #pos-x').val(this.realCurrentPosition.getX());
            $('.player-position #pos-y').val(this.realCurrentPosition.getY());
            this.mapPosition(this.realCurrentPosition);
        });
    }
}

