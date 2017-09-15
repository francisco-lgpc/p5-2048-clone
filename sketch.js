var grid = 80;
var tiles = [];

function setup() {
  createCanvas(800, 800);
  for (var i = 0; i < 3; i++) {
	  tiles.push(new Tile(2, int(random(width/grid)), int(random(height/grid))));
  }

}

function draw() {
  background(220);
  noStroke();
  for (var i = tiles.length - 1; i >= 0; i--) {
	  tiles[i].draw();
  }
}