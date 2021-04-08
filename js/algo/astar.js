function aStar(cells, row, col, goalRow, goalCol){
	if(!insideCells(row, col))		return false;

	var queue = [[cells[row][col]]];
	var visited = new Set();
	var foundPath = null;

	while(queue.length > 0 && foundPath == null){
		// look at the path
		// get the next path of least weight
		var path = popCheapHeuristic(queue, goalRow, goalCol);
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

/**
 *	returns the cheapest path in the queue which includes the heuristic
 */
function popCheapHeuristic(queue, gR, gC){
	// if there is only one item, no need to calculate
	if(queue.length <= 1) 	return queue.shift();

	// create list of cost
	var costs = [];
	// for each path
	for (var i = 0; i < queue.length; i++) {
		var cost = 0;
		// check weight for each node in path
		for(var j = 0; j < queue[i].length; j++){
			cost += queue[i][j].getWeight();
			cost += manhattan(queue[i][j], gR, gC);
		}
		costs[i] = cost;
	}

	// find the index of the cheapest
	var cheapIndex = 0;
	for (var i = 0; i < costs.length; i++) {
		if(costs[cheapIndex] > costs[i]){
			// new cheap index
			cheapIndex = i;
		}
	}
	var returnCell = queue[cheapIndex];
	queue.splice(cheapIndex, 1)

	return returnCell;
}

/**
 *	manhattan distance
 */
function manhattan(cell, gR, gC){
	return Math.abs(cell.row - gR)+Math.abs(cell.col - gC);
}
