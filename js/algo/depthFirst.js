function depthFirst(cells, visited, row, col){
	if(!insideCells(row, col))			return false;

	var c = cells[row][col];
	if(c.isWall())		return false;
	if(visited.has(c)) 	return false;
	if(c.isGoal()) 		return dfFound(c);

	visited.add(c);
	animations.push(new Action(c, "visit"));
	// check neighbours
	// N, E, S, W
	if(depthFirst(cells, visited, row-1, col))  return dfFound(c);
	if(depthFirst(cells, visited, row, col+1))	return dfFound(c);
	if(depthFirst(cells, visited, row+1, col))	return dfFound(c);
	if(depthFirst(cells, visited, row, col-1))	return dfFound(c);
	return false;
}

/**
 * adds animation and returns true
 */ 
function dfFound(cell){
	animations.push(new Action(cell, "path"));
	return true;
}