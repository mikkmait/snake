
// I have a set of 21 wall pieces - wall[]
// I will run a loop through all of them
//  21 iterations on the x axis and each has
//  21 spots on the y axis
// the grid is 21 by 21.

// COMMON RULES
(x-1).y != (x.y + 1 || x.y - 1)
if ((x-2).y === 1 || (x-2).y === 21)
	  x.y != 1 || x.y != 21

// SPECIFIC RULES

// First column rules:
//  - the wall cannot be in the position one removed from the corners
if (x === 1)
  y != 2 || 20
// Second column rules:
//  - the seconv column wall can never be in the first or last position
if (x === 2)
//  - if the first column wall is in the corner:
  if (prevWall.y === 1)
    y = 1 - 20 && y != 2
  if (prevWall.y === 21)
    y = 2 - 21 && y != 20
// Handling normal x2 (3 < x1 < 19)
  else
    y = 2 - 20 != (prevWall.y - 1 && prevWall.y + 1)
// Third column rules:
if (x === 3)
//  - if the first column wall is 3rd position from the corner
// the third column wall cannot be in positions 1, 2 or 4
// (2 and 4 are handled in the common rule)
  if (wall[i - 2].y === 3)
    y = 2 - 21 && y != +- 1
  if (wall[i - 2].y === 19)
    y = 1 - 20 && y != +- 1
  else
    y = 1 - 21 && y != +- 1
// Second to last column rules:
//  - the wall can never be in the first or the last position
if (x === 20)
//  - if the previous column is in the first position
// second to last cannot be in 1 and 2
  if (prevWall.y === 1)
    y = 3 - 20
  if (prevWall.y === 21)
    y = 2 - 19
  else
    y = 2 - 20 && y != +- 1
// Last column rules:
//  - last column wall position can never be 2 or 20
if (x === 21)
//  - if the second to last column wall position is 2
// the last column wall position can not be 1, 2, 3
  if (prevWall.y === 2 || wall[i - 2].y === 1)
    y = 4 - 21 && y != 20
  if (prevWall.y === 20 || wall[i - 2].y === 21)
    y = 1 - 18 && y != 2
  else
    y != 2, 20 && y != +- 1
// If any column is at positions 1 or 21,
// then the column next to from the next one cannot be 1 or 21 respectively
if (wall[i -2].y === 1)
  y = 2 - 21 && y != +- 1
if (wall[i -2].y === 21)
  y = 1 - 20 && y != +- 1
// Common rule:
//  every next wall block cannot be one removed to either side of the last one on y axis
//  It is not a perfect rule, but it easily solves a lot of impossible situations where the food can get locked.
else
  y = 1 - 21 && y != +- 1