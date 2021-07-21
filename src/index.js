import Game from "./Game";
import Piece from "./Piece";

function setup() {
  Game.activePiece = new Piece(Game.generateFloor());
  Game.activePiece = new Piece();
  document.addEventListener("keydown", ({ keyCode }) => {
    const peice = Game.activePiece;
    const codes = {
      37: peice.move.bind(peice, "left"),
      38: peice.rotate.bind(peice),
      39: peice.move.bind(peice, "right"),
      40: peice.move.bind(peice, "down")
    };
    if (codes[keyCode]) {
      codes[keyCode]();
    }
  });
  setInterval(draw, 100);
  // setTimeout(draw, 100);
}

function checkCollisions() {
  const { activePiece, cells } = Game;

  const isTouching = activePiece.cells.some(([x, y]) =>
    cells.some(coords => x === coords[0] && y + 1 === coords[1])
  );

  if (isTouching) {
    Game.activePiece = new Piece();
  }
}

function draw() {
  const {
    activePiece,
    cellSize,
    context,
    gameArea,
    oldPieces,
    tickCount
  } = Game;
  const { x1, x2, y1, y2 } = gameArea;

  Game.tick();
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(x1 * cellSize, y1 * cellSize, x2 * cellSize, y2 * cellSize);
  checkCollisions();

  if (tickCount % 10 === 0) {
    activePiece.move("down");
  }

  activePiece.draw();
  oldPieces.forEach(piece => piece.draw());
}

setup();
