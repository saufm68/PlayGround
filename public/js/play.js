var jsGrid;
var currentCoordinateX;
var currentCoordinateY;
var enemies = {}
var gameover = false;
var enemyMovements = [];
//import {noGravityPlayer, noGravityEnemyChase} from './functions.js';

function reCreateBoard() {

    const ajaxUrl = '/game-maker/play/json';

    const request = new XMLHttpRequest();

    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("status text", this.statusText);
      console.log("status code", this.status);

      let info = JSON.parse(this.responseText);
      jsGrid = JSON.parse(info.map);
      console.log(info);

      var container = document.getElementsByTagName('main')[0];
      var script = document.getElementsByTagName('script')[0];
      var table = document.createElement('table');
      table.id = 'gameContainer-play';
      container.insertBefore(table, script);

      var table = document.getElementById('gameContainer-play');
      var enemyCount = 1;
      var obstacleCount = 1;
      for (let i = 0; i < jsGrid.length; i++) {

        var tRow = document.createElement('tr');
        tRow.id = 'r-' + i;
        tRow.classList.add('createRow-play');
        table.appendChild(tRow);

        for (let j = 0; j < jsGrid[i].length; j++) {

            var tCol = document.createElement('td');
            tCol.id = 'c-' + j;
            tCol.classList.add('createCol-play');
            var row = document.getElementById('r-' + i);
            row.appendChild(tCol);

            if(jsGrid[i][j] === 'P') {
                let col = document.querySelector(`#r-${i} #c-${j}`);
                let image = document.createElement('img');
                image.classList.add('character-play');
                image.src = '/gamemaker-media/player.jpg';
                image.id = 'player';
                currentCoordinateY = i;
                currentCoordinateX = j;
                col.appendChild(image);
            } else if (jsGrid[i][j] === 'E') {
                let col = document.querySelector(`#r-${i} #c-${j}`);
                let image = document.createElement('img');
                image.src = '/gamemaker-media/enemy.jpg';
                image.classList.add('character-play');
                image.classList.add('enemy-behaviour');
                image.style['z-index'] = enemyCount;
                image.id = 'enemy' + enemyCount;
                enemies[image.id] = [i, j];
                col.appendChild(image);
                enemies[image.id] = [i, j, 'ok', image.id];
                enemyBehaviour(enemies[image.id]);
                enemyCount++;
            } else if (jsGrid[i][j] === 'G') {
                let col = document.querySelector(`#r-${i} #c-${j}`);
                let image = document.createElement('img');
                image.src = '/gamemaker-media/goal.jpg';
                image.classList.add('character-play');
                image.id = 'goal';
                col.appendChild(image);
            } else if (jsGrid[i][j] === 'O') {
                let col = document.querySelector(`#r-${i} #c-${j}`);
                let image = document.createElement('img');
                image.src = '/gamemaker-media/obstacle.jpg';
                image.classList.add('character-play');
                image.id = 'obstacle' + obstacleCount;
                col.appendChild(image);
                obstacleCount++;

            }
        }

      }

      movePlayer();
    };
    // listen for the request response
    request.addEventListener("load", responseHandler);

    request.open('GET', ajaxUrl);

    request.send();

};

reCreateBoard();


//finding the currnent co-ordinates of the the player
function plottingPlayer(Y, X) {

    var mapGridValue = "#r-" + Y + " #c-" + X;
    var mapGrid = document.querySelector(mapGridValue);
    var player = document.getElementById('player')
    mapGrid.appendChild(player);

};

function plottingEnemy(enemyId, Y, X) {

    var enemyGridValue = "#r-" + Y + " #c-" + X;
    var enemyGrid = document.querySelector(enemyGridValue);
    const enemy = document.getElementById(enemyId[3])
    enemyGrid.appendChild(enemy)

};

//getting the value of the key pressed and moving the character to the specified direction
function movePlayer() {

    import('./functions.js').then((module) => {
        module.noGravityPlayer(gameover, gameOver, win, jsGrid, currentCoordinateY, currentCoordinateX, plottingPlayer);
    });


};

// creating a random number
function randomness(number) {

    var randomNo = Math.floor(Math.random() * number);

    return randomNo;

};

function enemyBehaviour(enemyId) {

    var movement;

    import('./functions.js').then((module) => {
        movement = module.noGravityEnemyChase;
    });

    var intervalForMoving = setInterval(function(){
        movement(enemyId, currentCoordinateY, currentCoordinateX, jsGrid, randomness, gameOver, plottingEnemy);
    }, 200);

    enemyMovements.push(intervalForMoving);

};

var gameOver = function() {

    gameover = true;

    for (var i = 0; i < enemyMovements.length; i++) {

        clearInterval(enemyMovements[i]);

    }

    const main = document.getElementsByTagName('main')[0];
    const script = document.getElementsByTagName('script')[0];
    main.removeChild(document.getElementById('gameContainer-play'));
    const blank = document.createElement('div');
    main.insertBefore(blank, script);
    blank.classList.add('blank-container');

    var text = document.createElement("h1");
    var restart = document.createElement("button");
    restart.id = "restart";
    restart.innerHTML = "Restart";
    text.innerHTML = "Game Over!!";
    text.classList.add("text");
    blank.appendChild(text);
    blank.appendChild(restart);
    document.getElementById("restart").addEventListener("click", () => {
        location.reload()
    });

};

var win = function() {

    gameover = true;

    for (var i = 0; i < enemyMovements.length; i++) {

        clearInterval(enemyMovements[i]);

    }

    const main = document.getElementsByTagName('main')[0];
    const script = document.getElementsByTagName('script')[0];
    main.removeChild(document.getElementById('gameContainer-play'));
    const blank = document.createElement('div');
    main.insertBefore(blank, script);
    blank.classList.add('blank-container');

    var text = document.createElement("h1");
    var restart = document.createElement("button");
    restart.id = "play-again";
    restart.innerHTML = "Play Again";
    text.innerHTML = "Congratulations!!";
    text.classList.add("text");
    blank.appendChild(text);
    blank.appendChild(restart);
    document.getElementById("play-again").addEventListener("click", () => {
        location.reload()
    });


}


