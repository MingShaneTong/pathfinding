function dijkstra(cells, row, col){
	if(!insideCells(row, col))		return false;
 
	var queue = new PriorityQueue();
	queue.enqueue(cells[row][col], 0);
	var visited = new Set();
	var found = null;

	while(queue.size() > 0 && found == null){
		// look at the path
		// get the next path of least weight
		var queueItem = queue.dequeue();
		var elem = queueItem.element;
		var cost = queueItem.cost;

		// check if the last cell is the goal
		if(elem.isGoal())
			found = elem;
		else if(!elem.isWall()){
			// look at the surrounding cells of last 
			animations.push(new Action(elem, "visit"));
			
			var rows = [elem.row-1, elem.row, elem.row+1, elem.row];
			var cols = [elem.col, elem.col+1, elem.col, elem.col-1];

			// check neighbours and add to fringe
			for (var i = 0; i < 4; i++) {
				if(insideCells(rows[i], cols[i])){
					var c = cells[rows[i]][cols[i]];
					if(!visited.has(c)){
						c.previous = elem;
						visited.add(c);
						queue.enqueue(c, cost+c.weight);
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