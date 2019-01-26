# Snake Game (VanillaJS)(WIP)

This is a hobby project to learn more javascript. It is based on the classic snake
game we all had on our Nokia phones before the emergence of smart phones.

## Features
- Self Collision detection
- Out of bounds collision detection
- Food collection detection
- Tail enlargement
- (TODO): Food redraw should check for collision against the snake or tail
- (TODO): Food redraw should check to make sure it spawns in a place the snake can get to
- (TODO): Keep track of score on the UI
- (TODO): Game sounds

## Issues
- The UI update is limited to the time set by the application and so the user's 
  change of direction request might get lost in between repaints if the user
  requests a change that's too fast (i.e. right then down will go skip the right direction
  and continue going down).

## Notes

* There are two HTML Canvas elements on the page because I want to add the grid just once, not on every repaint (this uses `requestAnimationFrame()` not `setTimeout()` like some people might use). Similarly, I
display the food/apple on this grid and repaint only when the snake consumes the apple

* Since I am using `requestAnimationFrame()` here instead of `setTimeout()`, I need a way to limit how quickly the game logic is run, so that's why there's date then and date now variables to check how much time has passed before performing the next calculation and draw

* Currently the food location calculation is entirely random and does not perform any
  checks against the snake or its tail and does not check if the snake's path to it is
  clear