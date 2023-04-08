import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { draw as drawWall, wallIntersection } from './wall.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm("Game over. Press OK to restart.")) {
      window.location = '/snakeHardButGood'
    }
    return
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRenderTime < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime
  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
  drawWall(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || wallIntersection()
}