# Snake Game (VanillaJS)

This is a hobby project to learn more javascript. As they say, if you don't use it you lose it!!

## Some Explanation

* There are two HTML Canvas elements on the page because I want to add the grid just once, not on every repaint (this uses `requestAnimationFrame()` not `setTimeout()` like a lot of people do).

* Since I am using `requestAnimationFrame()` here instead of `setTimeout()`, I need a way to limit how quickly the game logic is run, so that's why there's date then and date now variables to check how much time has passed before performing the next calculation and draw

* This is the first iteration of this so there is a lot of room for improvements and features.