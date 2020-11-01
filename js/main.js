var cells = [];
var algo;
var aps = 60;
var distWeight = 0.1;
var gridSize = 36;

var rows = 0;
var cols = 0;

/**
 *	initialise the grid rows and col
 */
function newGrid(){
    animations = [];
	cols = Math.floor(width/gridSize);
  	rows = Math.floor(height/gridSize);

	// initialise the list
  	cells = new Array(rows);
  	for(var i = 0; i < rows; i++) {
  		cells[i] = new Array(cols);
  		for(var j = 0; j < cols; j++){
  			cells[i][j] = new Cell(i, j);
  		}
  	}

  	// add to the corners the start and end
  	cells[0][0].setContent("start");
  	cells[0][cols-1].setContent("goal");
}

/**
 *  returns the start cell
 */
function getStart(cells){
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++){
            var c = cells[i][j];
            if(c.isStart()) return c;
        }
    }
}

/**
 *  returns the goal cell
 */
function getGoal(cells){
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++){
            var c = cells[i][j];
            if(c.isGoal()) return c;
        }
    }
}

/**
 *  sets the cells to unvisited and not path
 */
function clearSearch(){
    animations = [];
    if(cells.length > 0){
        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < cols; j++){
                var c = cells[i][j];
                c.setVisit(false);
                c.setPath(false);
            }
        }
    }
}


/** Change Algorithm with Dropdown Menu */
function onDropdown(value){
	algo = value;
	// change dropdown label
	$("#navbarDropdown").text(value+" search");
}

$(".dropdown button").click(function(){ onDropdown(this.value); });


/**
 * changes the frame rate
 */
function onAPSSlider(value){
	aps = value;
}

function onSizeSlider(value){
    gridSize = value;
    newGrid();
}

function onAStarSlider(value){
    distWeight = value;
}

/** 
 * Find a path to the goal 
 * green for path
 * yellow for considered
 */
function runSearch(cells, startCell){
    clearSearch();
    animations = [];
    stop = false;

    switch(algo){
        case "depthFirst":
            var visited = new Set();
            depthFirst(cells, visited, startCell.row, startCell.col);
            break;
        case "breadthFirst":
            breadthFirst(cells, startCell.row, startCell.col);
            break;
        case "dijkstra":
            dijkstra(cells, startCell.row, startCell.col);
            break;
        case "a*":
            // find end cell
            var goalCell = getGoal(cells);
            aStar(cells, startCell.row, startCell.col, goalCell.row, goalCell.col);
            break;
    }
}


/**
 *  check the row and col are within the cells
 */
function insideCells(row, col){
    if(0 > row || row >= rows)          return false;
    if(0 > col || col >= cols)          return false;
    return true;
}