function Tile(num, row, col) {
	this.num = num;
	this.row = row;
	this.col = col;

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

	this.update = function (newRow, newCol) {
		grid[this.row][this.col] = null
		grid[newRow][newCol] = this
		this.row = newRow;
		this.col = newCol;
	}

	this.doubleNum = function() {
		this.num *= 2;
	}
}