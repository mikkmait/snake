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
  let exclude = []
  let getRandomNum = (min, max, exclude) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1) + min)
    exclude.forEach(element => { 
      if (ranNum === element) {
        ranNum = getRandomNum(min, max, exclude)
      }
    });
    return ranNum
  }
  if (x === 1) {
    exclude = [2, 20]
  } else if (x === 2) {
    if (prevWall.y === 1) {
      exclude = [2]
    } else if (prevWall.y === 21) {
      exclude = [20]
    } else {
      exclude = [prevWall.y -1, prevWall.y + 1]
    }
  } else if (x === 3) {
    if (wall[i - 2].y === 3) {
      exclude = [prevWall.y -1, prevWall.y + 1]
    } else if (wall[i -2].y === 19) {
      exclude = [prevWall.y -1, prevWall.y + 1]
    } else {
      exclude = [prevWall.y -1, prevWall.y + 1]
    }
  } else if (x === 20) {
    if (prevWall.y === 1) {
      exclude = []
    } else if (prevWall.y === 21) {
      exclude = []
    } else {
      exclude = [prevWall.y -1, prevWall.y + 1]
    }
  } else if (x === 21) {
    if (prevWall.y === 2 || wall[i - 2].y === 1) {
      exclude = [20]
    } else if (prevWall.y === 20 || wall[i - 2].y === 21) {
      exclude = [2]
    } else {
      exclude = [2, 20, prevWall.y - 1, prevWall.y +1]
    }
  } else if (wall[i - 2].y === 1) {
    exclude = [prevWall.y - 1, prevWall.y + 1]
  } else if (wall[i - 2].y === 21) {
    exclude = [prevWall.y - 1, prevWall.y + 1]
  } else {
    exclude = [prevWall.y - 1, prevWall.y + 1]
  }
  let y = getRandomNum(1, GRID_SIZE, exclude)
  return {x: x, y: y}
}