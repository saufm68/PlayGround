var jsGrid;
var currentCoordinateX;
var currentCoordinateY;
var enemies = {}
var gameover = false;
var enemyMovements = []

function reCreateBoard() {

    const ajaxUrl = '/game-maker/play/json';

    const request = new XMLHttpRequest();

    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("status text", this.statusText);
      console.log("status code", this.status);

      let info = JSON.parse(this.responseText);
      jsGrid = JSON.parse(info.map);
      console.log(jsGrid);

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

    var move = function(event){

        if (gameover === true) {

            window.removeEventListener("keydown", move);

        }

        var events = event.key;

        if (event.repeat === false) {

            if ( events === "w" && currentCoordinateY > 0) {

                if (jsGrid[currentCoordinateY - 1][currentCoordinateX] !== "O") {

                    if (jsGrid[currentCoordinateY - 1][currentCoordinateX] === "E") {
                        gameOver();
                    } else if (jsGrid[currentCoordinateY - 1][currentCoordinateX] === "G") {
                        win();
                    }else {

                        //to plot the co-ordinate of he player before moving
                        plottingPlayer(currentCoordinateY - 1, currentCoordinateX);
                        jsGrid[currentCoordinateY - 1][currentCoordinateX] = "P";
                        currentCoordinateY -= 1;
                        //to plot the co-ordinate of the player after moving
                        jsGrid[currentCoordinateY + 1][currentCoordinateX] = "*";

                    }
                }
            } else if (events === "s" && currentCoordinateY < jsGrid.length - 1) {

                if (jsGrid[currentCoordinateY + 1][currentCoordinateX] !== "O") {

                    if (jsGrid[currentCoordinateY + 1][currentCoordinateX] === "E") {
                        gameOver();
                    } else if (jsGrid[currentCoordinateY + 1][currentCoordinateX] === "G") {
                        win();
                    } else {

                        plottingPlayer(currentCoordinateY + 1, currentCoordinateX);
                        jsGrid[currentCoordinateY + 1][currentCoordinateX] = "P";
                        currentCoordinateY += 1;
                        jsGrid[currentCoordinateY - 1][currentCoordinateX] = "*";

                    }
                }
            } else if (events === "a" && currentCoordinateX > 0) {

                if (jsGrid[currentCoordinateY][currentCoordinateX - 1] !== "O") {

                    if (jsGrid[currentCoordinateY][currentCoordinateX - 1] === "E") {
                        gameOver();
                    } else if (jsGrid[currentCoordinateY][currentCoordinateX - 1] === "G") {
                        win();
                    } else {

                        plottingPlayer(currentCoordinateY, currentCoordinateX - 1);
                        jsGrid[currentCoordinateY][currentCoordinateX - 1] = "P";
                        currentCoordinateX -= 1;
                        jsGrid[currentCoordinateY][currentCoordinateX + 1] = "*";

                    }
                }
            } else if (events === "d" && currentCoordinateX <(jsGrid[0].length - 1)) {

                if (jsGrid[currentCoordinateY][currentCoordinateX + 1] !== "O") {

                    if (jsGrid[currentCoordinateY][currentCoordinateX + 1] === "E") {
                        gameOver();
                    } else if (jsGrid[currentCoordinateY][currentCoordinateX + 1] === "G") {
                        win();
                    } else {

                        plottingPlayer(currentCoordinateY, currentCoordinateX + 1);
                        jsGrid[currentCoordinateY][currentCoordinateX + 1] = "P";
                        currentCoordinateX += 1;
                        jsGrid[currentCoordinateY][currentCoordinateX - 1] = "*";

                    }
                }
            }
        }
    };
    window.addEventListener("keydown", move);
};

// creating a random number
function randomness(number) {

    var randomNo = Math.floor(Math.random() * number);

    return randomNo;

};

function enemyBehaviour(enemyId) {

    var moveUp = function(enemyId) {

        if (enemyId[0] > 0) {

            if (jsGrid[enemyId[0] - 1][enemyId[1]] !== "O" && jsGrid[enemyId[0] - 1][enemyId[1]] !== "G") {

                //to plot the co-ordinate of he player before moving
                if (jsGrid[enemyId[0] - 1][enemyId[1]] !== "P") {

                    plottingEnemy(enemyId, enemyId[0] - 1, enemyId[1]);
                    jsGrid[enemyId[0] - 1][enemyId[1]] = "E";
                    enemyId[0] -= 1;
                    jsGrid[enemyId[0] + 1][enemyId[1]] = "*";
                    enemyId[2] = "ok";

                } else {
                    gameOver();
                }

            } else {
                enemyId[2] = "notOk";
            }

        } else {
            enemyId[2] = "notOk";
        }

    };

    var moveDown = function(enemyId) {

        if (enemyId[0] < jsGrid.length - 1) {

            if (jsGrid[enemyId[0] + 1][enemyId[1]] !== "O" && jsGrid[enemyId[0] + 1][enemyId[1]] !== "G") {

                //to plot the co-ordinate of he player before moving
                if (jsGrid[enemyId[0] + 1][enemyId[1]] !== "P") {
                    plottingEnemy(enemyId, enemyId[0] + 1, enemyId[1]);
                    jsGrid[enemyId[0] + 1][enemyId[1]] = "E";
                    enemyId[0] += 1;
                    jsGrid[enemyId[0] - 1][enemyId[1]] = "*";
                    enemyId[2] = "ok";
                } else {
                    gameover();
                }

            } else {

                enemyId[2] = "notOk";
            }

        } else {

            enemyId[2] = "notOk";
        }

    };

    var moveLeft = function(enemyId) {

        if (enemyId[1] > 0) {

            if (jsGrid[enemyId[0]][enemyId[1] - 1] !== "O" && jsGrid[enemyId[0]][enemyId[1] - 1] !== "G") {

                //to plot the co-ordinate of he player before moving
                if (jsGrid[enemyId[0]][enemyId[1] - 1] !== "P") {
                    plottingEnemy(enemyId, enemyId[0], enemyId[1] - 1);
                    jsGrid[enemyId[0]][enemyId[1] - 1] = "E";
                    enemyId[1] -= 1;
                    jsGrid[enemyId[0]][enemyId[1] + 1] = "*";
                    enemyId[2] = "ok";
                } else {
                    gameOver();
                }

            } else {

                enemyId[2] = 'notOk';
            }

        } else {

            enemyId[2] = "notOk";
        }


    };

    var moveRight = function(enemyId) {

        if (enemyId[1] < jsGrid[0].length - 1) {

            if (jsGrid[enemyId[0]][enemyId[1] + 1] !== "O" && jsGrid[enemyId[0]][enemyId[1] + 1] !== "G") {

                //to plot the co-ordinate of he player before moving
                if (jsGrid[enemyId[0]][enemyId[1] + 1] !== "P") {
                    plottingEnemy(enemyId, enemyId[0], enemyId[1] + 1);
                    jsGrid[enemyId[0]][enemyId[1] + 1] = "E";
                    enemyId[1] += 1;
                    jsGrid[enemyId[0]][enemyId[1] - 1] = "*";
                    enemyId[2] = "ok";
                } else {
                    gameOver();
                }

            } else {

                enemyId[2] = "notOk";
            }

        } else {

            enemyId[2] = "notOk";
        }

    };

        var intervalForMoving = setInterval(function(){

            var differenceX = enemyId[1] - currentCoordinateX;
            var differenceY = enemyId[0] - currentCoordinateY;
            var valueDifferenceX = differenceX * -1;
            var valueDifferenceY = differenceY * -1;

            var options = [moveUp, moveDown, moveLeft, moveRight];

            if (valueDifferenceX < valueDifferenceY && differenceX < 0) {

                moveRight(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceX < valueDifferenceY && differenceX > 0) {

                moveLeft(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceY < valueDifferenceX && differenceY < 0) {

                moveDown(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while ( enemyId[2]  === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceY < valueDifferenceX && differenceY > 0) {

                moveUp(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceY === 0 && differenceX > 0) {

                moveLeft(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceY === 0 && differenceX < 0) {

                moveRight(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }

                }

            } else if (valueDifferenceX === 0 && differenceY > 0) {

                moveUp(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceX === 0 && differenceY < 0) {

                moveDown(enemyId);

                if (enemyId[2] === "notOk") {

                    var pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                    while (enemyId[2] === "notOk" ) {

                        pickRandomMovement = randomness(options.length);
                        options[pickRandomMovement](enemyId);

                    }
                }

            } else if (valueDifferenceX === valueDifferenceY) {

                var pickRandomMovement = randomness(options.length);
                options[pickRandomMovement](enemyId);

                while (enemyId[2] === "notOk" ) {

                    pickRandomMovement = randomness(options.length);
                    options[pickRandomMovement](enemyId);

                }

            }


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


