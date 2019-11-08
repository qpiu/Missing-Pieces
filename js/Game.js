import { gamestage } from './Utils.js';
import { Picture } from './Picture.js';

export class Game {
    constructor() {
        console.log("new game");
        this.stage = gamestage.START;
        this.main_game_loop = null;
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
        TweenMax.to("#connect-container h2", 1, { opacity: "0", ease: Power2.easeInOut });
        TweenMax.to("#connect-container h2, #phone-connect-input, #sensor-connect-input", 1, { display: "none", ease: Power2.easeInOut });
        setTimeout(function () {
            TweenMax.to("#calibration-container, #calibration-container #player-calibration, #player-calibration #message-c1", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
            TweenMax.to("#calibration-container #h2-player-calibration", 2, { top: "0", opacity: "1", ease: Elastic.easeInOut });
        }, 1000
        );
    }

    beginCalibration_2 = () => {
        this.setStage(gamestage.CALIB_2);
        console.log(this.getStage());
        TweenMax.to("#player-calibration #message-c1", .5, { opacity: "0.6", ease: Power2.easeInOut });
        TweenMax.to("#player-calibration #message-c2", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
        const calib_area = document.querySelector("#calibration-area");
        const dot = document.querySelector("#calibration-area #blinking-dot");
        calib_area.style.position = "relative";
        dot.style.position = "absolute";
        dot.style.bottom = "0";
        dot.style.right = "0";
    }

    loadGameImage = (pl) => {
        this.setStage(gamestage.LOAD_IMAGE);
        this.player = pl;
        console.log(this.getStage());
        TweenMax.to("#calibration-container", .5, { display: "none", opacity: "0", ease: Power2.easeInOut });
        setTimeout(function () {
            TweenMax.to("#game-container", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
        }, 1000
        );

        this.gamePicture = new Picture();
        this.gamePicture.setReadFileHandler(this.beginGame);
    }

    beginGame = () => {
        this.setStage(gamestage.BEGIN_GAME);
        //this.player = pl;
        console.log(this.getStage());
        this.game_canvas = document.getElementById('_game-canvas');
        this.player.updatePosition();
        const fps = 5;
        this.main_game_loop = setInterval(this.gameLoop, 1000 / fps);
    }

    gameLoop = () => {
        this.player.updatePosition();
        this.gamePicture.drawPieces(null);
        if(this.getStage() === gamestage.END_GAME) {
            clearInterval(this.main_game_loop);
        }
        this.player.showPosition();
        const currentMissing = this.gamePicture.getCurrentMissing();
        if (currentMissing != null) {
            // Still have pieces missing
            this.player.device.showImage(currentMissing.url); // send image to phone
        } else {
            // All pieces have been put back
            this.setStage(gamestage.END_GAME);
        }
    }
}
