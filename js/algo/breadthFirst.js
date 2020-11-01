function breadthFirst(cells, row, col){
	if(!insideCells(row, col))		return false;

	var queue = [[cells[row][col]]];
	var visited = new Set();
	var foundPath = null;

	while(queue.length > 0 && foundPath == null){
		// look at the path
		var path = queue.shift();
		var last = path[path.length-1];

		// check if the last cell is the goal
		if(last.isGoal())
			foundPath = path;
		else if(!visited.has(last) && !last.isWall()){
			// look at the surrounding cells of last 
			animations.push(new Action(last, "visit"));
			visited.add(last);
			// top
			if(insideCells(last.row-1, last.col))	
				queue.push(addToPath(path, cells[last.row-1][last.col]));
			// right
			if(insideCells(last.row, last.col+1))	
				queue.push(addToPath(path, cells[last.row][last.col+1]));
			// down
			if(insideCells(last.row+1, last.col))	
				queue.push(addToPath(path, cells[last.row+1][last.col]));
			// left
			if(insideCells(last.row, last.col-1))	
				queue.push(addToPath(path, cells[last.row][last.col-1]));
		}
	}

	// if a path is found, add animations
	if(foundPath != null){
		for(var i = 0; i<foundPath.length; i++){
			animations.push(new Action(foundPath[i], "path"));
		}
	}

}


function addToPath(path, cell){
	var np = [...path];
	np.push(cell);
	return np;
}