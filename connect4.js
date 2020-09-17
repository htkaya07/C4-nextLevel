/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const board=document.getElementById("board");
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;

  // TODO: write the real version of this, rather than always returning 0
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const tdDiv=document.createElement('div');
  tdDiv.classList.add('piece');
  tdDiv.classList.add(`p${currPlayer}`);
  tdDiv.style.top=-50*(y+2);
  
  
  const tdd=document.getElementById(`${y}-${x}`);
    
 tdd.append(tdDiv);
  
  

  // TODO: make a div and insert into correct table cell
}


/** endGame: announce game end */

function endGame(msg) {
  
  const bd=$(".header");
  const alrt=$("<div>").attr({
    class:"diy",
    role:"alert",
    
});
let hd=$("<h1>").text(msg);

alrt.append(hd);


 let bt=$("<input>").attr({
   class:"btn btn-primary",
   type:"reset",
   value:"Play Again"
   
 }).on("click",function() {
  location.reload();
 })
alrt.append(bt);


bd.append(alrt);
  
  
 
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  console.log(y)
  if (y === null) {
    return;
  }
board[y][x]=currPlayer;
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`PLAYER ${currPlayer} WON!!`);
  }

  // check for tie
  if(board.every(row =>row.every(cell=>cell))){
    return endGame('Tie!');
  }
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
       board[y][x] === currPlayer
       
    );
    
  }
  

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
