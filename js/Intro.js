
const word_missing = document.querySelector('#intro-content h2');
const letters_pieces = document.querySelectorAll('#intro-content span');
const start_button = document.querySelector('#intro-content button');

const appearText = () => {
    TweenMax.to(letters_pieces[0], 2.5, { css: { top: 0, opacity: 1 }, delay: 0.5, ease: Elastic.easeOut });
    TweenMax.to(letters_pieces[2], 2.5, { css: { top: 0, opacity: 1 }, delay: 0.6, ease: Elastic.easeOut });
    TweenMax.to(letters_pieces[4], 2.5, { css: { top: 0, opacity: 1 }, delay: 0.7, ease: Elastic.easeOut });
    TweenMax.to(letters_pieces[1], 2.5, { css: { top: 0, opacity: 1 }, delay: 0.8, ease: Elastic.easeOut });
    TweenMax.to(letters_pieces[3], 2.5, { css: { top: 0, opacity: 1 }, delay: 0.9, ease: Elastic.easeOut });
    TweenMax.to(letters_pieces[5], 2.5, { css: { top: 0, opacity: 1 }, delay: 1.0, ease: Elastic.easeOut });
    TweenMax.to(word_missing, 8, { css: { opacity: 1 }, delay: 0, ease: Elastic.easeOut });
    TweenMax.to(start_button, 8, { css: { opacity: 1 }, delay: 2.5, ease: Elastic.easeOut });
}

export { appearText };