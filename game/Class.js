class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 3;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    FindEmptyCells(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    Multiply() {
        this.multiply++;
        var cells = this.FindEmptyCells(0);
        var exact = random(cells);
        if (exact && this.multiply > 5) {
            let x = exact[0];
            let y = exact[1];
            let newGr = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(newGr);
            this.multiply = 0;
        }
    }
}

/*-----------------------------------------------------------------------------------*/

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    GetNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    ChooseCell(char) {
        this.GetNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }

    Mul() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);

            this.energy = 20;
        } else {
            console.error('there is no way to multiply');
        }
    }

    Eat() {
        let found = this.ChooseCell(1);
        let exact = random(found)

        if (exact) {
            this.energy += 3;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.Mul()
            }
        } else {
            this.Move()
        }
    }

    Move() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.Die()
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.Die()
            }
        }
    }

    Die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}

/*-----------------------------------------------------------------------------------*/

class AllEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    GetNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    ChooseCellToEat() {
        this.GetNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == 1 || matrix[y][x] == 2 || matrix[y][x] == 4 || matrix[y][x] == 5) {
                    result.push(this.directions[i]);
                }
            }
        }

        return result;
    }

    ChooseCell(char) {
        this.GetNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }

    Mul() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let allEater = new AllEater(x, y);
            matrix[y][x] = 3;
            allEaterArr.push(allEater);

            this.energy = 20;
        }
        else {
            console.error('there is no way to multiply');
        }
    }

    Eat() {
        let found = this.ChooseCellToEat();
        let exact = random(found);

        if (exact && matrix[exact[1]][exact[0]] == 1) {
            this.energy += 2;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                }
            }

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.energy > 30) {
                this.Mul();
            }
        }
        else if (exact && matrix[exact[1]][exact[0]] == 2) {
            this.energy += 3;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }
            }

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.energy > 30) {
                this.Mul();
            }
        }
        else if (exact && matrix[exact[1]][exact[0]] == 4) {
            this.energy += 3;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < toxicArr.length; i++) {
                if (toxicArr[i].x == x && toxicArr[i].y == y) {
                    toxicArr.splice(i, 1);
                }
            }

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.energy > 30) {
                this.Mul();
            }
        }
        else if (exact && matrix[exact[1]][exact[0]] == 5) {
            this.energy += 3;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < toxicEaterArr.length; i++) {
                if (toxicEaterArr[i].x == x && toxicEaterArr[i].y == y) {
                    toxicEaterArr.splice(i, 1);
                }
            }

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.energy > 30) {
                this.Mul();
            }
        }
        else {
            this.Move();
        }
    }

    Move() {
        let found = this.ChooseCell(0);
        let exact = random(found);

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.Die();
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.Die();
            }
        }
    }

    Die() {
        for (let i = 0; i < allEaterArr.length; i++) {
            if (allEaterArr[i].x == this.x && allEaterArr[i].y == this.y) {
                allEaterArr.splice(i, 1)
            }
        }

        matrix[this.y][this.x] = 0
    }
}
/*-----------------------------------------------------------------------------------*/




class Toxic {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    GetNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    ChooseCell(char) {
        this.GetNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }

    Mul() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new Toxic(x, y);
            matrix[y][x] = 4;
            //  grassEaterArr
             toxicArr.push(eater);

            this.energy = 20;
        } else {
            console.error('there is no way to multiply');
        }
    }

    Eat() {
        let found = this.ChooseCell(1);
        let exact = random(found)

        if (exact) {
            this.energy += 3;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.Mul()
            }
        } else {
            this.Move()
        }
    }

    Move() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.Die()
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.Die()
            }
        }
    }

    Die() {
        for (let i = 0; i < toxicArr.length; i++) {
            if (toxicArr[i].x == this.x && toxicArr[i].y == this.y) {
                toxicArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}


/*-----------------------------------------------------------------------------------*/




class ToxicEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    GetNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    ChooseCell(char) {
        this.GetNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }

    Mul() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new ToxicEater(x, y);
            matrix[y][x] = 5;
            //grassEaterArr
            toxicEaterArr.push(eater);

            this.energy = 20;
        } else {
            console.error('there is no way to multiply');
        }
    }

    Eat() {
        let found = this.ChooseCell(1);
        let exact = random(found)

        if (exact) {
            this.energy += 3;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 30) {
                this.Mul()
            }
        } else {
            this.Move()
        }
    }

    Move() {
        let found = this.ChooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.Die()
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.Die()
            }
        }
    }

    Die() {
        for (let i = 0; i < toxicEaterArr.length; i++) {
            if (toxicEaterArr[i].x == this.x && toxicEaterArr[i].y == this.y) {
                toxicEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}


