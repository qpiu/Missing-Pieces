
export class Picture {
    constructor() {
        console.log("new game picture");
        this.readFile();
    }

    readFile() {
        var imageLoader = document.getElementById('file');
        imageLoader.addEventListener('change', handleImage, false);
        function handleImage(e) {
            var canvas = document.getElementById('_game-canvas');
            var ctx = canvas.getContext('2d');
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            TweenMax.to("#load-image-container", .5, { display: "none", opacity: "0", ease: Power2.easeInOut });
        }
        
    }

}