import { appearText } from './Intro.js';
import { Player } from './Player.js';
import { fadeOut } from './Utils.js';
import { Game } from './Game.js';

let player = null;
let game = null;

// Intro
appearText();
document.querySelector("#intro-content button").addEventListener('click', () => {
    game = new Game();
    fadeOut("#intro-content");
    setTimeout(beginConnect, 1000);
});

const phoneConnectBtnClicked = () => {
    player = new Player(game);
    const ip = document.querySelector("#phone-connect-input input").value;
    player.phoneConnect(ip);
}

const sensorConnectBtnClicked = () => {
    const ip = document.querySelector("#sensor-connect-input input").value;
    player.sensorConnect(ip);
}

const beginConnect = () => {
    TweenMax.to("#connect-container, #connect-container button, #connect-container input", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
    TweenMax.to("#connect-container #h2-connection", 3, { top: "0", opacity: "1", ease: Elastic.easeInOut });
    document.querySelector("#phone-connect-input button").addEventListener('click', phoneConnectBtnClicked);
    document.querySelector("#sensor-connect-input button").addEventListener('click', sensorConnectBtnClicked);
}
