const PLAYER_TOKEN = 'X';
const COMPUTER_TOKEN = 'O';

$(document).ready(function() {
    const grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function gameOver(grid) {
        // Horizantal
        for (var i = 0; i < 3; i++) {
            if (grid[i][0] !== '' &&
                grid[i][0] === grid[i][1] &&
                grid[i][0] === grid[i][2]) {
                return grid[i][0];
            }
        }
        // Vertical
        for (var j = 0; j < 3; j++) {
            if (grid[0][j] !== '' &&
                grid[0][j] === grid[1][j] &&
                grid[0][j] === grid[2][j]) {
                return grid[0][j];
            }
        }
        // Diagonal - top left
        if (grid[0][0] !== '' &&
            grid[0][0] === grid[1][1] &&
            grid[0][0] === grid[2][2]) {
            return grid[0][0];
        }
        // Diagonal - bottom left
        if (grid[2][0] !== '' &&
            grid[2][0] === grid[1][1] &&
            grid[2][0] === grid[0][2]) {
            return grid[2][0];
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (grid[i][j] === '') {
                    return false;
                }
            }
        }

        return null;
    }

    function minmax(newGrid, depth, player) {
        const gameState = gameOver(newGrid);

        if (gameState === false) {
            const values = [];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    const gridCopy = _.cloneDeep(newGrid);
                    if (gridCopy[i][j] !== '') continue;
                    gridCopy[i][j] = player;
                    let value = minmax(gridCopy, depth + 1, ((player === PLAYER_TOKEN) ? COMPUTER_TOKEN : PLAYER_TOKEN));
                    values.push({
                        cost: value,
                        cell: {
                            i: i,
                            j: j
                        }
                    });
                }
            }
            if (player === COMPUTER_TOKEN) {
                const max = _.maxBy(values, (v) => {
                    return v.cost;
                });
                if (depth === 0) {
                    return max.cell;
                } else {
                    return max.cost;
                }
            } else {
                const min = _.minBy(values, (v) => {
                    return v.cost;
                });
                if (depth === 0) {
                    return min.cell;
                } else {
                    return min.cost;
                }

            }
        } else if (gameState === null) {
            return 0;
        } else if (gameState === PLAYER_TOKEN) {
            return depth - 10;
        } else if (gameState === COMPUTER_TOKEN) {
            return 10 - depth;
        }
    }

    function computerMove() {
        return minmax(grid, 0, COMPUTER_TOKEN);
    }

    $('.box').click(function() {

        let gameState = gameOver(grid);

        if (gameState || gameState === null) {
            return;
            
        }

        $this = $(this);
        const i = $this.data('i');
        const j = $this.data('j');
        if (grid[i][j] !== '') {
            return;
        }

        $this.html(PLAYER_TOKEN);

        grid[i][j] = PLAYER_TOKEN;

        gameState = gameOver(grid);

        if (gameState) {
            $('.winner').html('<p>Game over: ' + gameState + ' is the winner</p>');
            
            setTimeout(function() {
                $('.winner').html('');
            }, 5000);
            return;
        } else if (gameState === null) {
          $('.winner').html('<p>Game is drawn! Try again</p>');
          setTimeout(function() {
              $('.winner').html('');
          }, 5000);
            return;
        } else {
            const move = computerMove();
            grid[move.i][move.j] = COMPUTER_TOKEN;
            
            $('.box[data-i=' + move.i + '][data-j=' + move.j + ']').html(COMPUTER_TOKEN);
        }

        gameState = gameOver(grid);
        if (gameState) {
            $('.winner').html('<p>Game over: ' + gameState + ' is the winner</p>');
            setTimeout(function() {
                $('.winner').html('');
            }, 5000);
        }
    });

    $('#restart').click(function() {

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                grid[i][j] = '';
                $('.box[data-i=' + i + '][data-j=' + j + ']').html(' ');
            }
        }
    });

});