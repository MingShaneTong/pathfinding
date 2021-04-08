class AStarElem {
	constructor(cell, previous, g, f){
		this.cell = cell;
		this.previous = previous;
		this.g = g;
		this.f = f;
	}

}


function aStar(cells, row, col, goalRow, goalCol){
	if(!insideCells(row, col))		return false;
 
	var queue = new PriorityQueue();
	let h = manhattan(cells[row][col], goalRow, goalCol);
	queue.enqueue(
		new AStarElem(cells[row][col], null, 0, h), h);
	var visited = new Set();
	var found = null;

	while(queue.size() > 0 && found == null){
		// look at the path
		// get the next path of least weight
		var queueItem = queue.dequeue();
		var elem = queueItem.element;
		var cell = elem.cell;

		// check if the last cell is the goal
		if(!visited.has(cell)){
			// visit the cell
			animations.push(new Action(cell, "visit"));		
			visited.add(cell);
			cell.previous = elem.previous;

			if(cell.isGoal())
				found = cell;
			else if(!cell.isWall()){
				var rows = [cell.row-1, cell.row, cell.row+1, cell.row];
				var cols = [cell.col, cell.col+1, cell.col, cell.col-1];

				// check neighbours and add to fringe
				for (var i = 0; i < 4; i++) {
					if(insideCells(rows[i], cols[i])){
						var c = cells[rows[i]][cols[i]];
						if(!visited.has(c)){
							let g = elem.g + c.weight;
							let f = g + manhattan(c, goalRow, goalCol);
							queue.enqueue(
								new AStarElem(c, cell, g, f), f);
						}
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


/**
 *	manhattan distance
 */
function manhattan(cell, gR, gC){
	return Math.abs(cell.row - gR)+Math.abs(cell.col - gC);
}
