import { appearText } from './Intro.js';
import { Player } from './Player.js';
import { fadeOut, gamestage } from './Utils.js';
import { Game } from './Game.js';

//
let player = null;
let game = null;

// Intro
appearText();
document.querySelector("#intro-content button").addEventListener('click', () => {
    game = new Game();
    fadeOut("#intro-content");
    setTimeout(beginConnect, 1000);
});

const connectBtnClicked = () => {
    player = new Player(game);
    const ip = document.querySelector("#connect-container input").value;
    player.phoneConnect(ip);
}

const beginConnect = () => {
    TweenMax.to("#connect-container, #connect-container button, #connect-container input", .5, { display: "block", opacity: "1", ease: Power2.easeInOut });
    TweenMax.to("#connect-container #h2-phone-connect", 3, { top: "0", opacity: "1", ease: Elastic.easeInOut });
    document.querySelector("#connect-container button").addEventListener('click', connectBtnClicked);
}
