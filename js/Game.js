// const seasons = {
//     SUMMER: 'summer',
//     WINTER: 'winter',
//     SPRING: 'spring',
//     AUTUMN: 'autumn'
// }
import { gamestage } from './Utils.js';

export class Game {
    constructor() {
        console.log("new game");
        this.stage = gamestage.START;
    }

    setStage(st) {
        this.stage = st;
    }

    getStage() {
        return this.stage;
    }

    beginCalibration_1 = () => {
        this.setStage(gamestage.CALIB_1);
        console.log(this.getStage());
        TweenMax.to("#calibration-container, #calibration-container #player-calibration, #player-calibration #message-c1", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
        TweenMax.to("#calibration-container #h2-player-calibration", 2, { top: "0", opacity: "1", ease: Elastic.easeInOut });
        setTimeout(function () {
            TweenMax.to("#connect-container", 1, { position: "relative", top: "-200px", ease: Power2.easeInOut });
            TweenMax.to("#connect-container input", 1, { width: "200px", fontSize: "16", ease: Power2.easeInOut });
            TweenMax.to("#connect-container button", 1, { fontSize: "16px", ease: Power2.easeInOut });
            TweenMax.to("#connect-container h2", .1, { display: "none", ease: Power2.easeInOut });
        }, 800);
    }

    beginCalibration_2 = () => {
        this.setStage(gamestage.CALIB_2);
        console.log(this.getStage());
        TweenMax.to("#player-calibration #message-c1", .5, { opacity: "0.7", ease: Power2.easeInOut });
        TweenMax.to("#player-calibration #message-c2", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
        const calib_area = document.querySelector("#calibration-area");
        const dot = document.querySelector("#calibration-area #blinking-dot");
        calib_area.style.position = "relative";
        dot.style.position = "absolute";
        dot.style.bottom = "0";
        dot.style.right = "0";
    }
}