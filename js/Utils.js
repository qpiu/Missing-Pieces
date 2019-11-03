

const fadeOut = (s) => {
    const el = document.querySelector(s);
    el.style.opacity = '0';
    setTimeout(function () { el.parentNode.removeChild(el); }, 1000);
}

const gamestage = {
    START: 'start',
    CALIB_1: 'calibration_1',
    CALIB_2: 'calibration_2',
    BEGIN_GAME: 'begin_game'
}

export { fadeOut, gamestage };