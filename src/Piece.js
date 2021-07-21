import Game from "./Game";
const { shapes, gameArea, cellSize, context } = Game;

export default class Piece {
  constructor({
    shape = shapes[Math.floor(Math.random() * shapes.length)],
    x = Math.floor((gameArea.x2 - gameArea.x1) / 2) + gameArea.x1 - 1,
    y = gameArea.y1 - 2
  } = {}) {
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.setCells();
  }

  draw() {
    this.setCells();
    context.fillStyle = "rgb(200, 0, 0)";

    this.cells.forEach(([x, y]) => {
      context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  }

  setCells() {
    const renderableShape = this.shape[this.rotation];
    this.cells = renderableShape.map(([x, y]) => [this.x + x, this.y + y]);
  }

  move(direction) {
    switch (direction) {
      case "left":
        this.x--;
        break;
      case "right":
        this.x++;
        break;
      case "down":
        this.y++;
        break;
      case "up":
        this.y--;
        break;
      default:
    }
  }

  rotate() {
    this.rotation = (this.rotation + 1) % this.shape.length;
  }
}
