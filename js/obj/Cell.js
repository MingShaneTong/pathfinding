class Cell {
	constructor(row, col){
		this.row = row;
		this.col = col;

		this.content = null;
		this.wall = false;
		this.pressed = false;
		this.visited = false;
		this.path = false;
		this.weight = 1;

		this.previous = null;
	}

	setVisit(value){
		this.visited = value;
	}

	isVisited(){
		return this.visited;
	}

	setPath(value){
		this.path = value;
	}

	isPath(){
		return this.path;
	}

	increWeight(){
		if(this.wall)	return;
		this.weight++;
		if(this.weight > 9)	this.weight = 9;
	}

	decreWeight(){
		if(this.wall)	return;
		this.weight--;
		if(this.weight < 1)	this.weight = 1;
	}

	getWeight(){
		return this.weight;
	}

	isWeighted(){
		return this.weight > 1; 
	}



	toggleWall(){
		this.wall = !this.wall;
		if(this.wall) 	this.weight = 0;
	}

	isSpecial(){
		return this.isGoal() || this.isStart();
	}

	isEmpty(){
		return this.content == null;
	}

	isGoal(){
		return this.content == "goal";
	}

	isStart(){
		return this.content == "start";
	}

	isWall(){
		return this.wall;
	}

	getContent(){
		return this.content;
	}

	setContent(val){
		this.content = val;
	}

}