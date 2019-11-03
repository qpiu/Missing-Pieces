let sketch = function (p) {
    p.setup = function () {
        p.createCanvas(500, 500);
        p.background(0);
    }
};

new p5(sketch, 'game-container');