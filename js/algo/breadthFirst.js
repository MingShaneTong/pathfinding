function breadthFirst(cells, row, col){
	if(!insideCells(row, col))		return false;

	cells[row][col].previous = null;

	var queue = [cells[row][col]];
	var visited = new Set();
	var found = null;

	while(queue.length > 0 && found == null){
		// look at the path
		var last = queue.shift();

		// check if the last cell is the goal
		if(last.isGoal())
			found = last;
		else if(!last.isWall()){
			// look at the surrounding cells of last 
			animations.push(new Action(last, "visit"));
			
			var rows = [last.row-1, last.row, last.row+1, last.row];
			var cols = [last.col, last.col+1, last.col, last.col-1];

			for (var i = 0; i < 4; i++) {
				if(insideCells(rows[i], cols[i])){
					var c = cells[rows[i]][cols[i]];
					if(!visited.has(c)){
						c.previous = last;
						visited.add(c);
						queue.push(c);
					}
				}
			}
		}
	}

	// if a path is found, add animations
	if(found != null){
		while(!found.isStart()){
			animations.push(new Action(found, "path"));
			found = found.previous;
		}
		animations.push(new Action(found, "path"));
	}
}