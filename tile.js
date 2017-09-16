function Tile(num, row, col) {
	this.num 		= num;
	this.row 		= row;
	this.col 		= col;
	this.merged = false;

	fills = {}
	for (var i = 1; i < 15; i++) {
		n = 2**i
		var greyScale = i * 17
		if (greyScale < 127) {
			fills[n] = [color(greyScale), color(255)];
		} else {
			fills[n] = [color(greyScale), color(0)];
		}
	}

	this.show = function () {

		var numWidth = textWidth(num);
		
		fill(fills[this.num][0])
		stroke(fills[this.num][0])
		rect(this.col * gridUnit, this.row * gridUnit, gridUnit, gridUnit);
		fill(fills[this.num][1]);
		textAlign(CENTER, CENTER);
		textSize(int((gridUnit * 30)/80));
		text(
			this.num, 
			this.col * gridUnit, 
			this.row * gridUnit, 
			int(gridUnit * 1.1), gridUnit
		);
	}

	this.update = function (newRow, newCol, keyCode) {
		grid[this.row][this.col] = null
		var prev; 
		if (keyCode === LEFT_ARROW) {
			prev = grid[newRow][newCol - 1];
		} else  if (keyCode === RIGHT_ARROW) {
			prev = grid[newRow][newCol + 1];
		} else  if (keyCode === UP_ARROW && grid[newRow - 1]) {			
			prev = grid[newRow - 1][newCol];
  	} else if (keyCode === DOWN_ARROW && grid[newRow + 1]	) {
	  	prev = grid[newRow + 1][newCol];
	  }
  	if( 
  		prev &&
  		!prev.merged &&
  		prev.num === this.num
  	){
  		tiles.splice(tiles.indexOf(this), 1)
  		prev.doubleNum();
  		prev.merged = true;
  	} else {
			grid[newRow][newCol] = this
			this.row = newRow;
			this.col = newCol;			
		}
	}

	this.doubleNum = function() {
		this.num *= 2;
	}
}