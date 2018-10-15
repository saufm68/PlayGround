var jsGrid;
var currentCoordinateX;
var currentCoordinateY;

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
      var enemyCount = 0;
      var obstacleCount = 0;
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
                let image = document.createElement('img');
                image.src = '/gamemaker-media/player.jpg';
                image.classList.add('character-play');
                image.id = 'player';
                currentCoordinateY = i;
                currentCoordinateX = j;
                let col = document.querySelector(`#r-${i} #c-${j}`);
                col.appendChild(image);
            } else if (jsGrid[i][j] === 'E') {
                let image = document.createElement('img');
                image.src = '/gamemaker-media/enemy.jpg';
                image.classList.add('character-play');
                image.id = 'enemy' + enemyCount;
                enemyCount++;
                let col = document.querySelector(`#r-${i} #c-${j}`);
                col.appendChild(image);
            } else if (jsGrid[i][j] === 'G') {
                let image = document.createElement('img');
                image.src = '/gamemaker-media/goal.jpg';
                image.classList.add('character-play');
                image.id = 'goal';
                let col = document.querySelector(`#r-${i} #c-${j}`);
                col.appendChild(image);
            } else if (jsGrid[i][j] === 'O') {
                let image = document.createElement('img');
                image.src = '/gamemaker-media/obstacle.jpg';
                image.classList.add('character-play');
                image.id = 'obstacle' + obstacleCount;
                obstacleCount++;
                let col = document.querySelector(`#r-${i} #c-${j}`);
                col.appendChild(image);
            }
        }

      }

    };
    // listen for the request response
    request.addEventListener("load", responseHandler);

    request.open('GET', ajaxUrl);

    request.send();

};


//finding the currnent co-ordinates of the the player
// function plottingPlayer(y, x) {



//     var mapGridValue = "#r-" + currentCoordinateY + " #c-" + currentCoordinateX + " img";
//     var mapGrid = document.querySelector(mapGridValue);

//     if (view === undefined ) {

//        mapGrid.src = "";

//     } else {

//         mapGrid.src = view;
//     }

// };

//getting the value of the key pressed and moving the character to the specified direction
// function movePlayer() {

//     var move = function(event){

//         var player = document.getElementById('player');

//         if (gameover === true) {

//             window.removeEventListener("keydown", move);

//         }

//         var events = event.key;



//             if ( events == "w" && currentCoordinateY > 0) {

//                 if (jsGrid[currentCoordinateY - 1][currentCoordinateX] !== "O") {

//                     if (jsGrid[currentCoordinateY - 1][currentCoordinateX] === "E") {

//                         jsGrid[currentCoordinateY - 1][currentCoordinateX] = "E";
//                         currentCoordinateY -= 1;
//                         jsGrid[currentCoordinateY + 1][currentCoordinateX] = "*";

//                     } else {

//                         currentCoordinateY -= 1;
//                         var newPlace = document.querySelector(`#r-${currentCoordinateY} #c-${currentCoordinateX}`);
//                         jsGrid[currentCoordinateY][currentCoordinateX] = "P";
//                         jsGrid[currentCoordinateY + 1][currentCoordinateX] = "*";

//                     }


//                 }

//             }




            // } else if (events === "a" && currentCoordinateY < jsGrid.length - 1) {

            //     if (jsGrid[currentCoordinateY + 1][currentCoordinateX] !== "*") {

            //         if (jsGrid[currentCoordinateY + 1][currentCoordinateX] === "Y") {

            //             jsGrid[currentCoordinateY + 1][currentCoordinateX] = "Y";
            //             currentCoordinateY += 1;
            //             jsGrid[currentCoordinateY - 1][currentCoordinateX] = " ";

            //         } else {

            //             plottingPlayer();
            //             jsGrid[currentCoordinateY + 1][currentCoordinateX] = "X";
            //             currentCoordinateY += 1;
            //             plottingPlayer(selectedCharacter.frontView);
            //             jsGrid[currentCoordinateY - 1][currentCoordinateX] = " ";

            //         }
            //     }

            // } else if (events === "s" && currentCoordinateX > 0) {

            //     if (jsGrid[currentCoordinateY][currentCoordinateX - 1] !== "*") {

            //         if (jsGrid[currentCoordinateY][currentCoordinateX - 1] === "Y") {

            //             jsGrid[currentCoordinateY][currentCoordinateX - 1] = "Y";
            //             currentCoordinateX -= 1;
            //             jsGrid[currentCoordinateY][currentCoordinateX + 1] = " ";

            //         } else {

            //             plottingPlayer();
            //             jsGrid[currentCoordinateY][currentCoordinateX - 1] = "X";
            //             currentCoordinateX -= 1;
            //             plottingPlayer(selectedCharacter.leftView);
            //             jsGrid[currentCoordinateY][currentCoordinateX + 1] = " ";

            //         }
            //     }

            // } else if (events === "d" && currentCoordinateX <(jsGrid[0].length - 1)) {

            //     if (jsGrid[currentCoordinateY][currentCoordinateX + 1] !== "*") {

            //         if (jsGrid[currentCoordinateY][currentCoordinateX + 1] === "Y") {

            //             jsGrid[currentCoordinateY][currentCoordinateX + 1] = "Y";
            //             currentCoordinateX += 1;
            //             jsGrid[currentCoordinateY][currentCoordinateX - 1] = " ";

            //         } else {

            //             plottingPlayer();
            //             jsGrid[currentCoordinateY][currentCoordinateX + 1] = "X";
            //             currentCoordinateX += 1;
            //             plottingPlayer(selectedCharacter.rightView);
            //             jsGrid[currentCoordinateY][currentCoordinateX - 1] = " ";

            //         }
            //     }

            // }

//         window.addEventListener("keydown", move);
//     };

// };

// };

// function enemyBehaviour(enemyId) {

//     var moveUp = function(enemyId) {

//         if (enemyId[0] > 0) {

//             if (jsGrid[enemyId[0] - 1][enemyId[1]] !== "*" && jsGrid[enemyId[0] - 1][enemyId[1]] !== "E") {

//                 //to plot the co-ordinate of he player before moving
//                 plottingEnemy(enemyId);
//                 jsGrid[enemyId[0] - 1][enemyId[1]] = "Y";
//                 enemyId[0] -= 1;
//                 jsGrid[enemyId[0] + 1][enemyId[1]] = " ";
//                 //to plot the co-ordinate of the player after moving
//                 plottingEnemy(enemyId, selectedEnemy.backView);
//                 enemyId[2] = "ok";

//             } else {

//                 enemyId[2] = "notOk";
//             }

//         } else {

//             enemyId[2] = "notOk";
//         }

//     };

//     var moveDown = function(enemyId) {

//         if (enemyId[0] < jsGrid.length - 1) {

//             if (jsGrid[enemyId[0] + 1][enemyId[1]] !== "*" && jsGrid[enemyId[0] + 1][enemyId[1]] !== "E") {

//                 //to plot the co-ordinate of he player before moving
//                 plottingEnemy(enemyId);
//                 jsGrid[enemyId[0] + 1][enemyId[1]] = "Y";
//                 enemyId[0] += 1;
//                 jsGrid[enemyId[0] - 1][enemyId[1]] = " ";
//                 //to plot the co-ordinate of the player after moving
//                 plottingEnemy(enemyId, selectedEnemy.frontView);
//                 enemyId[2] = "ok";

//             } else {

//                 enemyId[2] = "notOk";
//             }

//         } else {

//             enemyId[2] = "notOk";
//         }

//     };

//     var moveLeft = function(enemyId) {

//         if (enemyId[1] > 0) {

//             if (jsGrid[enemyId[0]][enemyId[1] - 1] !== "*" && jsGrid[enemyId[0]][enemyId[1] - 1] !== "E") {

//                 //to plot the co-ordinate of he player before moving
//                 plottingEnemy(enemyId);
//                 jsGrid[enemyId[0]][enemyId[1] - 1] = "Y";
//                 enemyId[1] -= 1;
//                 jsGrid[enemyId[0]][enemyId[1] + 1] = " ";
//                 //to plot the co-ordinate of the player after moving
//                 plottingEnemy(enemyId, selectedEnemy.leftView);
//                 enemyId[2] = "ok";

//             } else {

//                 enemyId[2] = 'notOk';
//             }

//         } else {

//             enemyId[2] = "notOk";
//         }


//     };

//     var moveRight = function(enemyId) {

//         if (enemyId[1] < jsGrid[0].length - 1) {

//             if (jsGrid[enemyId[0]][enemyId[1] + 1] !== "*" && jsGrid[enemyId[0]][enemyId[1] + 1] !== "E") {

//                 //to plot the co-ordinate of he player before moving
//                 plottingEnemy(enemyId);
//                 jsGrid[enemyId[0]][enemyId[1] + 1] = "Y";
//                 enemyId[1] += 1;
//                 jsGrid[enemyId[0]][enemyId[1] - 1] = " ";
//                 //to plot the co-ordinate of the player after moving
//                 plottingEnemy(enemyId, selectedEnemy.rightView);
//                 enemyId[2] = "ok";

//             } else {

//                 enemyId[2] = "notOk";
//             }

//         } else {

//             enemyId[2] = "notOk";
//         }

//     };

//         var intervalForMoving = setInterval(function(){

//             var differenceX = enemyId[1] - currentCoordinateX;
//             var differenceY = enemyId[0] - currentCoordinateY;
//             var valueDifferenceX = differenceX * -1;
//             var valueDifferenceY = differenceY * -1;

//             var options = [moveUp, moveDown, moveLeft, moveRight];

//             if (valueDifferenceX < valueDifferenceY && differenceX < 0) {

//                 moveRight(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceX < valueDifferenceY && differenceX > 0) {

//                 moveLeft(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceY < valueDifferenceX && differenceY < 0) {

//                 moveDown(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while ( enemyId[2]  === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceY < valueDifferenceX && differenceY > 0) {

//                 moveUp(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceY === 0 && differenceX > 0) {

//                 moveLeft(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceY === 0 && differenceX < 0) {

//                 moveRight(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }

//                 }

//             } else if (valueDifferenceX === 0 && differenceY > 0) {

//                 moveUp(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceX === 0 && differenceY < 0) {

//                 moveDown(enemyId);

//                 if (enemyId[2] === "notOk") {

//                     var pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                     while (enemyId[2] === "notOk" ) {

//                         pickRandomMovement = randomness(options.length);
//                         options[pickRandomMovement](enemyId);

//                     }
//                 }

//             } else if (valueDifferenceX === valueDifferenceY) {

//                 var pickRandomMovement = randomness(options.length);
//                 options[pickRandomMovement](enemyId);

//                 while (enemyId[2] === "notOk" ) {

//                     pickRandomMovement = randomness(options.length);
//                     options[pickRandomMovement](enemyId);

//                 }

//             }


//         }, 295);

//         enemyMovements.push(intervalForMoving);

// };


// var gameOver = function() {

//     var checkForX = [];

//     for (var i = 0; i < totalRows; i++) {

//         var innerString = jsGrid[i].toString();
//         checkForX.push(innerString);

//     }

//     var string = checkForX.toString();
//     var check = string.includes("X");

//     if (check === false) {

//         gameover = true;
//         while (overallContainer.firstChild) {

//             overallContainer.removeChild(overallContainer.childNodes[0]);

//         }

//         var text = document.createElement("h1");
//         var text2 = document.createElement("h2");
//         var restart = document.createElement("button");
//         restart.innerHTML = "Restart";
//         text.innerHTML = "Game Over!!";
//         text.classList.add("gameover");
//         text2.classList.add("text2");
//         text2.innerHTML = "Nice try but you are not escaping from here...";
//         overallContainer.appendChild(text);
//         overallContainer.appendChild(text2);
//         overallContainer.appendChild(restart);
//         document.getElementsByTagName("button")[0].addEventListener("click", function(){location.reload()});

//         for (var i = 0; i < enemyMovements.length; i++) {

//             clearInterval(enemyMovements[i]);

//         }

//         clearInterval(executeCheck);
//         clearInterval(executeCheckForWin);
//         clearInterval(timer);
//         clearInterval(enemyGenerator);

//     }

// };

// var win = function() {

//     if (jsGrid[0].includes("E") === false) {

//         gameover = true;
//         while (overallContainer.firstChild) {

//             overallContainer.removeChild(overallContainer.childNodes[0]);

//         }

//         var text = document.createElement("h1");
//         var showScore = document.createElement("h2");
//         var restart = document.createElement("button");
//         restart.innerHTML = "Restart";
//         text.innerHTML = "Congratulations!!";
//         text.classList.add("winner");
//         showScore.classList.add("score");
//         showScore.innerHTML = "Your score is: " + seconds;
//         overallContainer.appendChild(text);

//         //check browser support
//         if ( typeof(Storage) !== undefined) {

//             if (localStorage.getItem("highScore") !== null ) {

//                 var currentHighScore = localStorage.getItem("highScore");

//                 if (currentHighScore >= seconds) {

//                     localStorage.setItem("highScore", seconds);
//                     localStorage.setItem("leaderboardInitials", initials);
//                 }

//             } else {

//                localStorage.setItem("highScore", seconds);
//                localStorage.setItem("leaderboardInitials", initials);
//             }

//             var highScore = document.createElement("h2");
//             highScore.innerHTML = "LEADERBOARD: " + localStorage.getItem("leaderboardInitials") + " " +localStorage.getItem("highScore");
//             highScore.classList.add("highscore");
//             overallContainer.appendChild(highScore);

//         }

//         overallContainer.appendChild(showScore);
//         overallContainer.appendChild(restart);
//         document.getElementsByTagName("button")[0].addEventListener("click", function(){location.reload()});

//         for (var i = 0; i < enemyMovements.length; i++) {

//             clearInterval(enemyMovements[i]);

//         }

//         clearInterval(executeCheck);
//         clearInterval(executeCheckForWin);
//         clearInterval(timer);
//         clearInterval(enemyGenerator);

//     }
// }

reCreateBoard();
movePlayer();









