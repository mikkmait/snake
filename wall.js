import { getSnakeHead, onSnake } from "./snake.js"
import { GRID_SIZE } from "./grid.js"

let wall = []
const wallAmount = 21
for ( let i = 0; i < wallAmount; i++ ) {
  wall.push(getRandomWallPos(i))
}

export function draw(gameBoard) {
  for ( let i = 0; i < wallAmount; i++ ) {
    const wallElement = document.createElement('div')
    wallElement.style.gridRowStart = wall[i].y
    wallElement.style.gridColumnStart = wall[i].x
    wallElement.classList.add('wall')
    gameBoard.appendChild(wallElement)
  }
}

export function onWall(position = {}) {
  return wall.some((segment) => {
    return equalPositions(segment, position)
  })
}

function equalPositions(pos1, pos2) {
  return (
    pos1.x === pos2.x && pos1.y === pos2.y
  )
}

export function wallIntersection() {
  return onWall(getSnakeHead())
}

function getRandomWallPos(i) {
  let newWallPos
  while (newWallPos == null || onSnake(newWallPos)) {
    newWallPos = randomWallPos(i)
  }
  return newWallPos
}

export function randomWallPos(i) {
  let x = i + 1
  let prevWall = wall[i - 1]
  if (x === 1 || x === 21) {
    let y = Math.floor(Math.random() * (GRID_SIZE - 4) + 3)
    return { x: x, y: y }
  } else if (x === 2 || x === 20) {
    let genRandomNum = (min, max, exclude) => {
      let ranNum = Math.floor(Math.random() * (max - min) + 2)
      if (ranNum === exclude + 1) {
        ranNum = genRandomNum(min, max, exclude)
      } else if (ranNum === exclude - 1) {
        ranNum = genRandomNum(min, max, exclude)
      }
      return ranNum
    }
    let y = genRandomNum(2, GRID_SIZE, prevWall.y)
    return { x: x, y: y }
  } else {
    let genRandomNum = (min, max, exclude) => {
      let ranNum = Math.floor(Math.random() * (max - min) + 1)
      if (ranNum === exclude + 1) {
        ranNum = genRandomNum(min, max, exclude)
      } else if (ranNum === exclude - 1) {
        ranNum = genRandomNum(min, max, exclude)
      }
      return ranNum
    }
    let y = genRandomNum(0, GRID_SIZE, prevWall.y)
    return { x: x, y: y }
  };
}