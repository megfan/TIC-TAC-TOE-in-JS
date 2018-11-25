const PLAYER_TOKEN = 'X';
const COMPUTER_TOKEN = 'O';

$(document).ready(function(){

    console.log('lalala');
    
    const grid = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];
    
    function isGameOver(){
        //check horizontal
        for(var i = 0 ; i < 3; i++){
            if(grid[i][0] !== ' ' &&
            grid[i][0] === grid[i][1] &&
            grid[i][0] === grid[i][2]){
                return grid[i][0]
            }
        }
        //check vertical
        for(var j = 0 ; j < 3; j++){
            if(grid[0][j] !== ' ' &&
            grid[0][j] === grid[1][j] &&
            grid[0][j] === grid[2][j]){
                return grid[0][j]
            }
        }
        //chcek diagonal top left - bottom right
        if(grid[0][0] !== ' ' &&
        grid[0][0] === grid[1][1] &&
        grid[0][0] === grid[2][2]){
            return grid[0][0]
        }
        //chcek diagonal top right - bottom left
        if(grid[2][0] !== ' ' &&
        grid[2][0] === grid[1][1] &&
        grid[2][0] === grid[0][2]){
            return grid[2][0]
        }
    
        for(var i = 0 ; i < 3; i++){
            for(var j = 0 ; j < 3; j++){
                if(grid[i][j] === ' '){
                    return false;
                }
            }
        }
    
        return null;
    }
    
    function minmax(newGrid, depth, player){
        const gameState = isGameOver(newGrid);
        if(gameState === false){
            const values = [];
            
            for(var i = 0 ; i < 3; i++){
                for(var j = 0 ; j < 3; j++){
                    const gridCopy = _.cloneDeep(newGrid);
                    if(gridCopy[i][j] !== ' ') continue;
                    gridCopy[i][j] = player;
                    const value = minmax(gridCopy, depth + 1, (player === PLAYER_TOKEN) 
                    ? COMPUTER_TOKEN : PLAYER_TOKEN)
                    values.push({
                        cost: value,
                        cell: {
                            i: i, 
                            j: j
                        }
                    });    
                }
            }
            if (player === COMPUTER_TOKEN){
                const max = _.maxBy(values, (v) => {
                    return v.cost;
                });
                if(depth === 0) {
                    return max.cell;
                }else{
                    return max.cost;
                }
            }else {
                const min = _.minBy(values, (v) => {
                    return v.cost;
                });
                if(depth === 0) {
                    return min.cell;
                }else{
                    return min.cost;
                }
            }

        }else if(gameState === null){
            return 0;
        }else if(gameState === PLAYER_TOKEN){
            return depth - 10;
        }else if(gameState === COMPUTER_TOKEN){
            return 10 - depth;
        }
    }

    function moveAI(){
        
        return minmax(grid, 0, COMPUTER_TOKEN);

    }
    
    $('.col').click(function(){
        $this = $(this);
        $this.html(PLAYER_TOKEN);
        $this.addClass('clicked')
        const i = $this.data('i');
        const j = $this.data('j');
        grid[i][j] = PLAYER_TOKEN;
        console.log(grid);
    
        let gameState = isGameOver()

        if (gameState){
            alert('game over' + gameState);
        }else{
            const move = moveAI()
            grid[move.i][move.j] = COMPUTER_TOKEN;
            
            $('.col[data-i=' +move.i+ '][data-j=' +move.j+ ']').html(COMPUTER_TOKEN);
        }
        gameState = isGameOver()
        if(gameState){
            alert('game over' + gameState);
        }
    });

    $('#restart').click(function(){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                grid[i][j] = ' ';
                $('.col[data-i=' +i+ '][data-j=' +j+ ']').html(' ');
            }
        }
    });


});

