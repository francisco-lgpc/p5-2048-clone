function Tile(num, row, col) {
	this.num 		= num;
	this.row 		= row;
	this.col 		= col;
	this.merged = false;

	this.draw = function () {
		var numWidth = textWidth(num);
		//console.log('**')
		//console.log((col * gridUnit) + numWidth/2);
		fill(0)
		stroke(255)
		rect(this.col * gridUnit, this.row * gridUnit, gridUnit, gridUnit);
		fill(255);
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