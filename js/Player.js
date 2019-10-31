import { gamestage } from './Utils.js';

export class Player {
    constructor(game) {
        console.log("new player device");
        this.game = game;
    }

    phoneConnect(ip) {
        this.device = new tramontana();
        this.device.start(ip, (e) => {
            this.device.makeVibrate();
            this.device.subscribeTouch(() => this.phoneTouchHandler());
            TweenMax.to("#connect-container h2", 1, { opacity: "0", ease: Power2.easeInOut });
            const btn_el = document.querySelector("#connect-container button");
            // btn_el.removeEventListener('click', connectBtnClicked);
            const new_btn_el = btn_el.cloneNode(true);
            btn_el.parentNode.replaceChild(new_btn_el, btn_el);
            new_btn_el.style.backgroundColor = "#cccccc";
            new_btn_el.style.color = "#ffffff";
            new_btn_el.textContent = "Connected";
            const input_el = document.querySelector("#connect-container input");
            input_el.setAttribute("readonly", "readonly");
            this.game.beginCalibration_1();
        });
    }

    phoneTouchHandler() {
        console.log(this.game.stage + ' touch!');
        const current_stage = this.game.stage;
        switch (current_stage) {
            case gamestage.CALIB_1:
                // TODO: record x, y position
                this.game.beginCalibration_2();
                break;
            case gamestage.CALIB_2:
                // TODO: record x, y position
                break;
        }
    }

    // test()
}

