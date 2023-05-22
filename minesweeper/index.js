const div = document.createElement('div');
div.id = 'app';
const body = document.querySelector('body');
body.appendChild(div);

const btn = document.createElement('button');
btn.id = 'btn';
btn.innerHTML = 'New game';
body.appendChild(btn);

function reset(){
    window.location.reload();
}
btn.addEventListener("click", reset);

const appElem = document.getElementById("app");

const time = document.createElement('div');
time.id = 'countdown';
time.innerHTML = '0 second';
body.appendChild(time);

function countdownReload() {
    let reloadTime = 0; // Время в секундах до перезагрузки
    const countdownElement = document.getElementById("countdown");

    setInterval(function() {
        reloadTime++;
        countdownElement.innerText = reloadTime + " sec";
    }, 1000);
}
window.onload = countdownReload;

class Box {
    constructor(isBomb, coordinates) {
        this.isBomb = isBomb;
        this.coordinates = coordinates;
    }

    setBoxValue(value) {
        this.value = value;
    }

    setBoxType() {
        if (this.isBomb) {
            this.setBoxValue("💣");
            return;
        }
        const allNeighbors = getAllNeighbors(this.coordinates);
        let bombCount = 0;

        allNeighbors.forEach((neighbor) => {
            if (neighbor === 1 || neighbor.isBomb) {
                bombCount++;
            }
        });

        if (bombCount) {
            this.setBoxValue(bombCount);
        }
    }

    showBoxValue() {
        this.boxElem.innerHTML = this.value || "";
    }

    setFlag(isFlagged) {
        this.isFlagged = isFlagged;
        this.boxElem.innerHTML = isFlagged ? "🚩" : "";
    }

    open() {
        this.isOpenned = true;
        this.boxElem.classList.remove("initial");
        this.showBoxValue();
    }
    checkVictory() {
        const allBoxes = Array.from(document.querySelectorAll('.box'));

        for (const box of allBoxes) {
            if (!box.isOpenned && !box.isBomb) {
                return false;
            }
        }

        return true;
    }

    onBoxClick(allowOpenNumber = false) {
        if (this.isFlagged) {
            this.setFlag(false);
            return;
        }

        if (!this.value && !this.isOpenned) {
            this.open();
            const allNeighbors = getAllNeighbors(this.coordinates);
            allNeighbors.forEach((neighbor) => {
                if (!neighbor.isOpenned) {
                    neighbor.onBoxClick(true);
                }
            });

        } else if (
            (this.value && allowOpenNumber) ||
            typeof this.value === "number"
        ) {
            this.open();
        } else if (this.isBomb) {
            openAllBoxes();
            alert(`Game over. Try again`);
        }

        this.showBoxValue();
        if (this.checkVictory()) {
            alert("Hooray! You found all mines in ## seconds and N moves!");
        }
    }

    createBoxOnArea() {
        const boxElem = document.createElement("div");
        boxElem.classList.add("box");
        boxElem.classList.add("initial");

        if (this.value) {
            boxElem.classList.add(`bomb-count-${this.value}`);
        }

        this.boxElem = boxElem;
        this.boxElem.addEventListener("click", () => this.onBoxClick());
        this.boxElem.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.setFlag(true);
        });
        appElem.appendChild(boxElem);
    }
}

function createBox(isBomb, coordinates) {
    const newBox = new Box(isBomb, coordinates);

    newBox.setBoxType();
    newBox.createBoxOnArea();

    return newBox;
}

let matrix = [];

function addBombs(bombCount) {
    let currentBombCount = bombCount;

    const matrixHeight = matrix.length;
    const matrixWidth = matrix[0].length;

    while (currentBombCount) {
        const x = generateRandom(0, matrixWidth - 1);
        const y = generateRandom(0, matrixHeight - 1);

        const matrixElem = matrix[y][x];

        if (!matrixElem) {
            matrix[y][x] = 1;
            currentBombCount--;
        }
    }
}

function getAllNeighbors(coordinates) {
    const { x, y } = coordinates;

    const n_1 = matrix[y - 1]?.[x];
    const n_2 = matrix[y - 1]?.[x + 1];
    const n_3 = matrix[y]?.[x + 1];
    const n_4 = matrix[y + 1]?.[x + 1];
    const n_5 = matrix[y + 1]?.[x];
    const n_6 = matrix[y + 1]?.[x - 1];
    const n_7 = matrix[y]?.[x - 1];
    const n_8 = matrix[y - 1]?.[x - 1];

    return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(
        (item) => typeof item !== "undefined"
    );
}

function openAllBoxes() {
    matrix.forEach((matrixLine) => {
        matrixLine.forEach((box) => {
            if (box.isBomb) {
                box.open();
            }
        });
    });
}

function createMatrix(width = 10, height = 10, bombCount = 10) {
    matrix = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => 0)
    );

    addBombs(bombCount);

    matrix.forEach((matrixLine, y) => {
        matrixLine.forEach((matrixElem, x) => {
            const newBox = createBox(Boolean(matrixElem), { x, y });

            matrix[y][x] = newBox;
        });
    });
}

function generateRandom(min = 0, max = 100) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}

createMatrix();
