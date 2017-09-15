function Tile(num, row, col) {
	this.num = num;
	this.row = row;
	this.col = col;
	this.draw = function (numFill) {
		var numWidth = textWidth(num);
		//console.log('**')
		//console.log((col * grid) + numWidth/2);
		fill(0)
		stroke(255)
		rect(col * grid, row * grid, grid, grid);
		fill(255);
		textAlign(CENTER, CENTER);
		textSize(int((grid * 30)/80));
		text(num, col * grid, row * grid, int(grid * 1.1), grid);
	}
}