const noGravityPlayer = (gameover, gameOver, win, jsGrid, currentCoordinateY, currentCoordinateX, plottingPlayer) => {

    var move = function(event){

        if (gameover === true) {

            window.removeEventListener("keydown", move);

        }

        var events = event.key;

        if (event.repeat === false) {

            if ( (events === "w" || events === "W") && currentCoordinateY > 0) {

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
            } else if ( (events === "s" || events === "S") && currentCoordinateY < jsGrid.length - 1) {

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
            } else if ( (events === "a" || events === "A") && currentCoordinateX > 0) {

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
            } else if ( (events === "d" || events === "D") && currentCoordinateX <(jsGrid[0].length - 1)) {

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

const noGravityEnemyChase = (enemyId, currentCoordinateY, currentCoordinateX, jsGrid, randomness, gameOver, plottingEnemy) => {

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
                    gameOver();
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

    //////////////////////NEW Function///////////////////////////


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
};


export {noGravityPlayer};
export {noGravityEnemyChase};









