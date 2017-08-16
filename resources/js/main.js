const PLAYER_TOKEN= 'X';
const COMPUTER_TOKEN ='O';

$(document).ready(function() {
  const grid = [
    ['','',''],
    ['','',''],
    ['','','']
];

function gameOver(){
  // Horizantal
  for(var i=0; i<3; i++){
    if(grid[i][0] !== '' &&
      grid[i][0] === grid[i][1] &&
      grid[i][0] === grid[i][2]) {
        return grid[i][0];
    }
  }
  // Vertical
  for(var j=0; j<3; j++){
    if(grid[0][j] !== '' && 
        grid[0][j] === grid[1][j] && 
        grid[0][j] === grid[2][j]) {
          return grid[0][j];
    }
  }

  // Diagonal - top left
  if(grid[0][0] !== '' && 
      grid[0][0] === grid[1][1] && 
      grid[0][0] === grid[2][2]) {
        return grid[0][0];
  }

  // Diagonal - bottom left
  if(grid[2][0] !== '' && 
      grid[2][0] === grid[1][1] && 
      grid[2][0] === grid[0][2]) {
        return grid[2][0];
  }
  
  for(var i =0; i<3; i++){
    for(var j=0; j<3; j++){
      if(grid[i][j] === ''){
        return false;
      }
    }
  }
  
  return null;
}

function computerMove(){
   for(var i =0; i<3; i++){
    for(var j=0; j<3; j++){
      if(grid[i][j] === ''){
        return {
          i:i,
          j:j
        };
      }
    }
  }
  return null;
}

$('.box').click(function(){
  $this = $(this);
  $this.html(PLAYER_TOKEN);
  const i = $this.data('i');
  const j = $this.data('j');
  grid[i][j] = PLAYER_TOKEN;

  let gameState = gameOver();
  
  if(gameState){
    $('.winner').html('<p>Game over: '+gameState+' is the winner</p>');
    return;
  }else {
    const move = computerMove();
    grid[move.i][move.j] = COMPUTER_TOKEN;
    $('.box[data-i='+move.i+'][data-j='+move.j+']').html(COMPUTER_TOKEN);
  }

  gameState = gameOver();
  if(gameState) {
    $('.winner').html('<p>Game over: '+gameState+' is the winner</p>');
  }

});

$('#restart').click(function(){
  
  for(var i =0; i<3; i++){
    for(var j=0; j<3; j++){
     grid[i][j] === '';
     $('.box[data-i='+i+'][data-j='+j+']').html(' ');
    }
  }
});

});