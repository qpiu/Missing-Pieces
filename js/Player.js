import { gamestage } from './Utils.js';

class Position {
    constructor(x, y) {
        console.log(`new Pos(${x}, ${y})`);
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
        this.realCanvasOrigin = new Position(-1, -1); // top left position of space
        this.realCanvasSize = new Position(-1, -1);   // bottom right position of space
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
                this.game.beginGame();
                break;
        }
    }

    // test()
}

