let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let ground = new Image();
ground.src = "../img/ground.png";

let foodArr = new Array();
foodArr[0] = new Image();
foodArr[0].src = "../img/food1.png";
foodArr[1] = new Image();
foodArr[1].src = "../img/food2.png";
foodArr[2] = new Image();
foodArr[2].src = "../img/food3.png";
foodArr[3] = new Image();
foodArr[3].src = "../img/food4.png";
foodArr[4] = new Image();
foodArr[4].src = "../img/food5.png";
foodArr[5] = new Image();
foodArr[5].src = "../img/food6.png";
foodArr[6] = new Image();
foodArr[6].src = "../img/food7.png";

let foodImg = foodArr[Math.floor(foodArr.length * Math.random())];

let box = 35;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 65 && dir != "right") {
    dir = "left";
  } else if (event.keyCode == 87 && dir != "down") {
    dir = "up";
  } else if (event.keyCode == 68 && dir != "left") {
    dir = "right";
  } else if (event.keyCode == 83 && dir != "up") {
    dir = "down";
  }
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      ctx.fillStyle = "black";
      ctx.font = "50px Arial";
      ctx.fillText("Игра окончена!", box * 5, box * 10);
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "black";
  ctx.font = "45px Arial";
  ctx.fillText("Счет: " + score, box * 1, box * 2);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    foodImg = foodArr[Math.floor(foodArr.length * Math.random())];
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(game);
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText("Игра окончена!", box * 5, box * 10);
  }

  if (dir == "left") {
    snakeX -= box;
  }
  if (dir == "right") {
    snakeX += box;
  }
  if (dir == "up") {
    snakeY -= box;
  }
  if (dir == "down") {
    snakeY += box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
