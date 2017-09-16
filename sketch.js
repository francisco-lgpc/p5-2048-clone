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
	var merged = false
  if (keyCode === LEFT_ARROW) {
  	for (var times = 0; times < 2; times++) {
  		if (merged) {
  			break;
  		}
	    for (var i = 0; i < totalRows; i++) {
	    	for (var j = 0; j < totalCols; j++) {
					if (grid[i][j] === null) {
						for (var k = j + 1; k < totalCols; k++) {
							if (grid[i][k] !== null) {
								grid[i][k].update(i, j);
								break;
							}
						}
					} else if (grid[i][j + 1] && grid[i][j].num === grid[i][j + 1].num) {
	   				var index = tiles.indexOf(grid[i][j + 1]);
	   				if (index > -1) {
	 				   	tiles.splice(index, 1);
	 				   	grid[i][j + 1] = null;
	 				   	grid[i][j].doubleNum();
	 				   	merged = true;
						} 			
	    		}
	    	}
	    }
	  }
	  merged = false
  	updateGrid(newTileIndices(1));
  } else if (keyCode === RIGHT_ARROW) {
  	for (var times = 0; times < 2; times++) {
  		if (merged) {
  			break;
  		}
	    for (var i = 0; i < totalRows; i++) {
	    	for (var j = totalCols - 1; j >= 0; j--) {
					if (grid[i][j] === null) {
						for (var k = j - 1; k >= 0; k--) {
							if (grid[i][k] !== null) {
								grid[i][k].update(i, j);
								break;
							}
						}
					} else if (grid[i][j - 1] && grid[i][j].num === grid[i][j - 1].num) {
	   				var index = tiles.indexOf(grid[i][j - 1]);
	   				if (index > -1) {
	 				   	tiles.splice(index, 1);
	 				   	grid[i][j - 1] = null;
	 				   	grid[i][j].doubleNum();
	 				   	merged = true;
						} 			
	    		}    		
	    	}
	    }
	  }
	  merged = false
  	updateGrid(newTileIndices(1));
  } else if (keyCode === UP_ARROW) {
  	for (var times = 0; times < 2; times++) {
  		if (merged) {
  			break;
  		}
	  	for (var j = 0; j < totalCols; j++) {
		    for (var i = 0; i < totalRows; i++) {
					if (grid[i][j] === null) {
						for (var k = i + 1; k < totalRows; k++) {
							if (grid[k][j] !== null) {
								grid[k][j].update(i, j);
								break;
							}
						}
					} else if (grid[i + 1] && grid[i + 1][j] && grid[i][j].num === grid[i + 1][j].num) {
	   				var index = tiles.indexOf(grid[i + 1][j]);
	   				if (index > -1) {
	 				   	tiles.splice(index, 1);
	 				   	grid[i + 1][j] = null;
	 				   	grid[i][j].doubleNum();
	 				   	merged = true;
						} 			
	    		}    		
	    	}
	    }
	  }
	  merged = false
  	updateGrid(newTileIndices(1));
  } else if (keyCode === DOWN_ARROW) {
  	for (var times = 0; times < 2; times++) {
  		if (merged) {
  			break;
  		}
	  	for (var j = 0; j < totalCols; j++) {
	    	for (var i = totalRows - 1; i >= 0; i--) {
					if (grid[i][j] === null) {
						for (var k = i - 1; k >= 0; k--) {
							if (grid[k][j] !== null) {
								grid[k][j].update(i, j);
								break;
							}
						}
					} else if (grid[i - 1] && grid[i - 1][j] && grid[i][j].num === grid[i - 1][j].num) {
	   				var index = tiles.indexOf(grid[i - 1][j]);
	   				if (index > -1) {
	 				   	tiles.splice(index, 1);
	 				   	grid[i - 1][j] = null;
	 				   	grid[i][j].doubleNum();
	 				   	merged = true;
						} 			
	    		}     		
	    	}
	    }
	  }
	  merged = false
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