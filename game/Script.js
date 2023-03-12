var side = 20;
var grassArr = [];
var grassEaterArr = [];
var allEaterArr = [];
var toxicArr = [];
var toxicEaterArr = [];
var matrix = [];

function setup() {
    function CreateMatrix(m, n) {
        let matrix = [];

        for (let i = 0; i < m; i++) {
            matrix.push([]);
            for (let j = 0; j < n; j++) {
                matrix[i].push(Math.floor(Math.random()));
            }
        }

        for (let i = 0; i < 40; i++) {
            let x = Math.floor(random(matrix[0].length));
            let y = Math.floor(random(matrix.length));

            matrix[y][x] = 1;
        }

        for (let i = 0; i < 10; i++) {
            let x = Math.floor(random(matrix[0].length));
            let y = Math.floor(random(matrix.length));

            matrix[y][x] = 2;
        }

        for (let i = 0; i < 10; i++) {
            let x = Math.floor(random(matrix[0].length));
            let y = Math.floor(random(matrix.length));

            matrix[y][x] = 3;
        }
        for (let i = 0; i < 10; i++) {
            let x = Math.floor(random(matrix[0].length));
            let y = Math.floor(random(matrix.length));

            matrix[y][x] = 4;
        }
        for (let i = 0; i < 10; i++) {
            let x = Math.floor(random(matrix[0].length));
            let y = Math.floor(random(matrix.length));

            matrix[y][x] = 5;
        }

        return matrix;
    }

    matrix = CreateMatrix(60, 60);

    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grassEaterArr.push(grEater)
            }
            else if (matrix[y][x] == 3) {
                var allEater = new AllEater(x, y);
                allEaterArr.push(allEater);
            }
            else if (matrix[y][x] == 4) {
                var toxic = new Toxic(x, y);
                toxicArr.push(toxic);
            }
            else if (matrix[y][x] == 5) {
                var toxicEater = new ToxicEater(x, y);
                toxicEaterArr.push(toxicEater);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }

            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].Multiply();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].Eat();
    }
    for (var i in allEaterArr) {
        allEaterArr[i].Eat();
    }
    for (var i in toxicArr) {
        toxicArr[i].Eat();
    }
    for (var i in toxicEaterArr) {
        toxicEaterArr[i].Eat();
    }
}
