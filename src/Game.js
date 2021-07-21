class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = 800;
    this.canvas.width = 600;

    this.tickCount = 0;
    this.cellSize = 30;
    this.gameArea = {
      x1: 1,
      y1: 1,
      x2: 10,
      y2: 20
    };
    this.floor = this.gameArea.y2 - this.gameArea.y1;
    this.pieces = [];
    this._cells = [];
    this.shapes = [
      [
        // Tetronimo
        [[0, 1], [1, 1], [2, 1], [3, 1]],
        [[2, 0], [2, 1], [2, 2], [2, 3]],
        [[0, 2], [1, 2], [2, 2], [3, 2]],
        [[1, 0], [1, 1], [1, 2], [1, 3]]
      ],
      [
        // J
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [2, 0]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
        [[0, 2], [1, 0], [1, 1], [1, 2]]
      ],
      [
        // L
        [[0, 1], [1, 1], [2, 1], [2, 0]],
        [[1, 0], [1, 1], [1, 2], [2, 2]],
        [[0, 1], [0, 2], [1, 1], [2, 1]],
        [[0, 0], [1, 0], [1, 1], [1, 2]]
      ],
      [
        // Square
        [[1, 0], [1, 1], [2, 0], [2, 1]]
      ],
      [
        // S
        [[0, 1], [1, 0], [1, 1], [2, 0]],
        [[1, 0], [1, 1], [2, 1], [2, 2]],
        [[0, 2], [1, 1], [1, 2], [2, 1]],
        [[0, 0], [0, 1], [1, 1], [1, 2]]
      ],
      [
        // T
        [[0, 1], [1, 0], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [2, 1]],
        [[0, 1], [1, 1], [1, 2], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [1, 2]]
      ],
      [
        // Z
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[1, 1], [1, 2], [2, 0], [2, 1]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
        [[0, 1], [0, 2], [1, 0], [1, 1]]
      ]
    ];
  }

  // Getters
  get context() {
    return this.ctx;
  }

  get activePiece() {
    return this.pieces[this.pieces.length - 1];
  }

  get oldPieces() {
    return this.pieces.slice(0, -1);
  }

  get cells() {
    return this.oldPieces.map(piece => piece.cells).flat();
  }

  // Setters
  set activePiece(piece) {
    this.pieces.push(piece);
  }

  // Methods
  tick() {
    this.tickCount++;
  }

  generateFloor() {
    const { x1, x2 } = this.gameArea;
    const innerShape = [];

    for (let i = 0; i <= x2 - x1; i++) {
      innerShape.push([i, 1]);
    }

    return {
      x: x1,
      y: this.floor + 1,
      shape: [innerShape]
    };
  }
}

const canvas = document.getElementById("tetris");
const game = new Game(canvas);
export default game;
