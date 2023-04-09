# snake

This is a snake game. The underlying game mechanics are from this tutorial:
https://youtu.be/QTcIXok9wNY

## Added feature - The wall

I created a random wall generator, that creates randomized wall positions in the start of each game, and the wall algorithm is somewhat described in the wallbuildingRules txt file. The wall is generated in a way that there would not be created positions that would make it possible that the food can appear somewhere where the snake can't get it. All the while trying not to restrict where the wall can be. As much positions as possible, are getting used, without generating "traps".