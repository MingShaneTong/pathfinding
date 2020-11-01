var animations = [];
var stop = false;

var playImg;
var pauseImg;
var iconCount;		// the frames remaining for the play/pause icon to be on screen

var mouseLocked;
var cellPressed;
var hoverCell;

function setup() {
	createCanvas(windowWidth-1, windowHeight-110);
	playImg = loadImage('img/play.png');
	pauseImg = loadImage('img/pause.png');

	mouseLocked = false;
	newGrid();
}

function windowResized() {
	resizeCanvas(windowWidth-1, windowHeight-110);
}

function draw(){
	background(255);

	// check animations
	if(frameCount%(61-aps)===0 && !stop && animations.length > 0){
		var a = animations[0];
		switch(a.action){
			case "visit":
				a.cell.setVisit(true);
				break;
			case "path":
				a.cell.setPath(true);
				break;
		}
		animations.shift();
	}

	// draws the main grid
	// Begin loop for columns
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			// Scaling up to draw a rectangle at (x,y)
			var x = j*gridSize;
			var y = i*gridSize;

			// checks the colour of the rectangle
			var c = cells[i][j]
			if(c.isWall())	fill("black");

			// mouse dependant colours
			else if(c == cellPressed){
				// special square that is pressed
				var yellow = color("yellow");
				yellow.setAlpha(180);
				fill(yellow);
			} else if(c == hoverCell){
				// the location to move the special square pressed
				fill("yellow");
			}

			// visited and path colours
			else if(c.isPath()){
				fill("green");
			} else if(c.isVisited()){
				fill("yellow");
			} else  fill(255);

			stroke(200);
			// For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
			rect(x, y, gridSize, gridSize);


			// look at the square array and draw
			if(c.isGoal())	drawGoal(x, y, gridSize, 255);
			if(c.isStart())	drawStart(x, y, gridSize, 255);
			if(c.isWeighted())	drawWeight(x, y, gridSize, c.getWeight());
		}
	}

	// add play or pause icon
	if(iconCount > 0){
		var img = stop?pauseImg:playImg;
		var x = windowWidth/2;
		var y = windowHeight/2-img.height;
		image(img, x, y);
		iconCount--;
	}
}

/**
 * check if animations are running
 */ 
function animationRunning(){
	return animations.length > 0;
}

/**
 *  selects the current square
 */
function mousePressed(){
	if(animationRunning())	return;
	mouseLocked = true;
	var c = row_col(mouseX, mouseY);
	// is a grid on screen
	if(insideCells(c[0], c[1])){
		cellPressed = cells[c[0]][c[1]];
		if(mouseButton === LEFT){
			// left mouse buttton
			if(!cellPressed.isSpecial()){
				// turn into a wall
				cellPressed.toggleWall();
			}
		} 
	}
}

/**
 * change the weight
 */
function mouseWheel(event) { 
	if(animationRunning())	return;
    var scrollDelta = event.delta; 
    var c = row_col(mouseX, mouseY);
    if(insideCells(c[0], c[1])){
		var cell = cells[c[0]][c[1]];
			 if(scrollDelta < 0) 	cell.increWeight();
		else if(scrollDelta > 0) 	cell.decreWeight();
	}
} 

/**
 *  moves the pressed square or create more walls
 */
function mouseDragged(){
	if(animationRunning())	return;
	if(cellPressed == null)	return;
	var cor = row_col(mouseX, mouseY);
	// is a grid on screen
	if(insideCells(cor[0], cor[1])){
		var c = cells[cor[0]][cor[1]];
		// if the square is to be moved
		if(cellPressed.isSpecial()){
			// move square
			// turn the square into hover square if it is not a wall
			if(!c.isWall()){
				hoverCell = c;
			}
		} else if(c != cellPressed && !c.isSpecial()) {
			// toggle different square into wall
			c.toggleWall();
			cellPressed = c;
		}
	}
}


/**
 *	unlocks and unpresses the cell
 */ 
function mouseReleased(){
	if(animationRunning())	return;
	mouseLocked = false;
	if(cellPressed != null){
		if(cellPressed.isSpecial() && hoverCell != null){
			// check the new location of the special square
			var content = cellPressed.getContent();
			cellPressed.setContent(hoverCell.getContent());
			hoverCell.setContent(content);

			hoverCell = null;
		}

		cellPressed = null;
	}
}

/**
 *	returns the row and col of mouse location
 */
function row_col(x, y){
	return [Math.floor(y/gridSize), Math.floor(x/gridSize)]
}

function keyPressed(){
	// if it is the space bar then toggle stop
	if(key == " ") stopToggle();
} 


function stopToggle(){
	stop = !stop;
	iconCount = 20;
}

/**
 *  draws the start in the square
 */
function drawStart(x, y, size, alpha){
	var blue = color("blue");
	blue.setAlpha(alpha);

	fill(blue);
	//rect(x+size/5, y+size/5, size*3/5);
	rect(x+size/4, y+size/4, size/2);
}


/**
 *  draws the goal in the square
 *  a circle inside a circle
 */
function drawGoal(x, y, size, alpha){
	var blue = color("blue");
	blue.setAlpha(alpha);

	fill(blue);
    circle(x+size/2, y+size/2, size*5/6);
    erase();
    circle(x+size/2, y+size/2, size*7/12);
    noErase();
    fill(blue);
    circle(x+size/2, y+size/2, size/3);
}

function drawWeight(x, y, size, weight){
	textSize(32);
	fill("black");
	text(weight, x+size/4, y+size*5/6);
}