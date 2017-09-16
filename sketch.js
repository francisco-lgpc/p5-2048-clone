var gridUnit = 80;
var totalRows;
var totalCols;
var grid = []
var tiles = [];

function setup() {
  createCanvas(400, 400);

	totalRows = int(height/gridUnit);
	totalCols = int(width/gridUnit);

  for (var i = 0; i < totalRows; i++) {
	  var row = [];
	  grid.push(row);
	  for (var j = 0; j < totalCols; j++) {
	  	row.push(null);
	  }  	
  }
  updateGrid(newTileIndices(3));
}

function draw() {
  background(220);

  for (var i = tiles.length - 1; i >= 0; i--) {
	  tiles[i].draw();
  }
}

function keyPressed() {
	for (var i = tiles.length - 1; i >= 0; i--) {
	  tiles[i].merged = false;
  }

  if (keyCode === LEFT_ARROW) {
    for (var i = 0; i < totalRows; i++) {
    	for (var j = 0; j < totalCols; j++) {
				if (grid[i][j] === null) {
					for (var k = j + 1; k < totalCols; k++) {
						if (grid[i][k] !== null) {
							grid[i][k].update(i, j, keyCode);
							break;
						}
					}
				} else {
					grid[i][j].update(i, j, keyCode);
    		}
    	}
    }
  	updateGrid(newTileIndices(1));
  } else if (keyCode === RIGHT_ARROW) {
    for (var i = 0; i < totalRows; i++) {
    	for (var j = totalCols - 1; j >= 0; j--) {
				if (grid[i][j] === null) {
					for (var k = j - 1; k >= 0; k--) {
						if (grid[i][k] !== null) {
							grid[i][k].update(i, j, keyCode);
							break;
						}
					}
				} else {
					grid[i][j].update(i, j, keyCode);
    		}    		
    	}
    }
  	updateGrid(newTileIndices(1));
  } else if (keyCode === UP_ARROW) {
  	for (var j = 0; j < totalCols; j++) {
	    for (var i = 0; i < totalRows; i++) {
				if (grid[i][j] === null) {
					for (var k = i + 1; k < totalRows; k++) {
						if (grid[k][j] !== null) {
							grid[k][j].update(i, j, keyCode);
							break;
						}
					}
				} else {
					grid[i][j].update(i, j, keyCode);
    		}    		
    	}
    }
  	updateGrid(newTileIndices(1));
  } else if (keyCode === DOWN_ARROW) {
  	for (var j = 0; j < totalCols; j++) {
    	for (var i = totalRows - 1; i >= 0; i--) {
				if (grid[i][j] === null) {
					for (var k = i - 1; k >= 0; k--) {
						if (grid[k][j] !== null) {
							grid[k][j].update(i, j, keyCode);
							break;
						}
					}
				} else {
					grid[i][j].update(i, j, keyCode);
    		}     		
    	}
    }
    updateGrid(newTileIndices(1));
  }
}

function newTileIndices(numTiles) {
	var pool = []
	for (var i = 0; i < totalRows; i++) {
		for (var j = 0; j < totalCols; j++) {
			if (grid[i][j] === null) {
				pool.push([i, j]);
			}
		}
	}
	return shuffle(pool).slice(0, numTiles);
}

function updateGrid(indices) {
	  indices.forEach(function(tileIndex) {
  	var row = tileIndex[0];
  	var col = tileIndex[1];
  	var tile = new Tile(2, row, col);

	  tiles.push(tile);
	  grid[row][col] = tile;
  });
}

function* shuffle(array) {

    var i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
    }

}