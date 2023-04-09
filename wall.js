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
  let getRandomNumSingle = (min, max, exclude) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1) + min)
    if (ranNum === exclude) {
      ranNum = getRandomNumSingle(min, max, exclude)
    }
    return ranNum
  }
  let getRandomNumDouble = (min, max, exclude1, exclude2) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1) + min)
    if (ranNum === exclude1) {
      ranNum = getRandomNumDouble(min, max, exclude1, exclude2)
    } else if (ranNum === exclude2) {
      ranNum = getRandomNumDouble(min, max, exclude1, exclude2)
    }
    return ranNum
  }
  let getRandomNumQuadro = (min, max, exclude1, exclude2, exclude3, exclude4) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1) + min)
    if (ranNum === exclude1) {
      ranNum = getRandomNumQuadro(min, max, exclude1, exclude2, exclude3, exclude4)
    } else if (ranNum === exclude2) {
      ranNum = getRandomNumQuadro(min, max, exclude1, exclude2, exclude3, exclude4)
    } else if (ranNum === exclude3) {
      ranNum = getRandomNumQuadro(min, max, exclude1, exclude2, exclude3, exclude4)
    } else if (ranNum === exclude4) {
      ranNum = getRandomNumQuadro(min, max, exclude1, exclude2, exclude3, exclude4)
    }
    return ranNum
  }
  if (x === 1) {
    let y = getRandomNumDouble(1, GRID_SIZE, 2, 20)
    return {x: x, y: y}
  } else if (x === 2) {
    if (prevWall.y === 1) {
      let y = getRandomNumSingle(1, GRID_SIZE - 1, 2)
      return {x: x, y: y}
    } else if (prevWall.y === 21) {
      let y = getRandomNumSingle(2, GRID_SIZE - 1, 20)
      return {x: x, y: y}
    } else {
      let y = getRandomNumDouble(2, GRID_SIZE - 1, prevWall.y - 1, prevWall.y + 1)
      return {x: x, y: y}
    }
  } else if (x === 3) {
    if (wall[i - 2].y === 3) {
      let y = getRandomNumDouble(2, GRID_SIZE, prevWall.y - 1, prevWall.y + 1)
      return {x: x, y: y}
    } else if (wall[i -2].y === 19) {
      let y = getRandomNumDouble(1, GRID_SIZE - 1, prevWall.y -1, prevWall.y + 1)
      return {x: x, y: y}
    } else {
      let y = getRandomNumDouble(1, GRID_SIZE, prevWall.y - 1, prevWall.y + 1)
      return {x: x, y: y}
    }
  } else if (x === 20) {
    if (prevWall.y === 1) {
      let y = getRandomNumDouble(3, GRID_SIZE - 1)
      return {x: x, y: y}
    } else if (prevWall.y === 21) {
      let y = getRandomNumDouble(2, GRID_SIZE - 2)
      return {x: x, y: y}
    } else {
      let y = getRandomNumDouble(2, GRID_SIZE - 1, prevWall.y - 1, prevWall.y + 1)
      return {x: x, y: y}
    }
  } else if (x === 21) {
    if (prevWall.y === 2 || wall[i - 2].y === 1) {
      let y = getRandomNumSingle(4, GRID_SIZE, 20)
      return {x: x, y: y}
    } else if (prevWall.y === 20 || wall[i - 2].y === 21) {
      let y = getRandomNumSingle(1, GRID_SIZE - 3, 2)
      return {x: x, y: y}
    } else {
      let y = getRandomNumQuadro(1, GRID_SIZE, 2, 20, prevWall.y - 1, prevWall.y + 1)
      return {x: x, y: y}
    }
  } else if (wall[i - 2].y === 1) {
    let y = getRandomNumDouble(2, GRID_SIZE, prevWall.y - 1, prevWall.y + 1)
    return {x: x, y: y}
  } else if (wall[i - 2].y === 21) {
    let y = getRandomNumDouble(1, GRID_SIZE - 1, prevWall.y - 1, prevWall.y + 1)
    return {x: x, y: y}
  } else {
    let y = getRandomNumDouble(1, GRID_SIZE, prevWall.y - 1, prevWall.y + 1)
    return {x: x, y: y}
  }
}