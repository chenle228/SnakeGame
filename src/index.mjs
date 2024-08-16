import "./styles.css";
// Initialize the Game State:
// Define the grid, snake, apple, direction, and score
const gridSize = 15;
let snake = [
  { x: 7, y: 7 },
  { x: 7, y: 6 },
  { x: 7, y: 5 },
];
let apple = getRandomApplePosition();
let direction = { x: 0, y: 1 };
let score = 0;

function getRandomApplePosition() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (
    snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    )
  );
  return position;
}

// Render the Grid and Snake:
// Render the grid and update it based on the game state
const gridElement = document.getElementById("grid");

function render() {
  gridElement.innerHTML = "";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");

      if (snake.some((segment) => segment.x === col && segment.y === row)) {
        cell.classList.add("snake-body");
      }

      if (apple.x === col && apple.y === row) {
        cell.classList.add("apple");
      }

      gridElement.appendChild(cell);
    }
  }
  document.getElementById("score").textContent = score;
}

// Handle Movement and Game Logic:
// Update the snake's position, check for collisions, and handle apple collection
function update() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Check for collision with walls
  if (
    newHead.x < 0 ||
    newHead.x >= gridSize ||
    newHead.y < 0 ||
    newHead.y >= gridSize
  ) {
    return endGame();
  }

  // Check for collision with the snake itself
  if (
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    return endGame();
  }

  snake.unshift(newHead);

  // Check if apple is eaten
  if (newHead.x === apple.x && newHead.y === apple.y) {
    score++;
    apple = getRandomApplePosition();
  } else {
    snake.pop();
  }

  render();
}

function endGame() {
  alert(`Game Over! Your final score was ${score}`);
  resetGame();
}

function resetGame() {
  snake = [
    { x: 7, y: 7 },
    { x: 7, y: 6 },
    { x: 7, y: 5 },
  ];
  direction = { x: 0, y: 1 };
  apple = getRandomApplePosition();
  score = 0;
  render();
}

// Handle User Input:
// Allow the user to control the snake with arrow keys or WASD
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
    case "s":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
    case "a":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
    case "d":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});
// Start the Game Loop:
// Use setInterval to continuously update the game state
setInterval(update, 200); // Update the game every 200ms

// Display intro message
alert(
  "Welcome to Snake Game! Use arrow keys or WASD to move the snake. Press OK to start the game."
);
