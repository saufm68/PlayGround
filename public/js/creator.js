const jsGrid=[];
let enemyCount = 0;
let obstacleCount = 0;

function drag() {

    const draggable = document.getElementsByClassName('character');

    for (let i = 0; i < draggable.length; i++) {
        draggable[i].addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('Text', event.target.id);
        });
    }

};

function createBoard() {

    const table = document.getElementById('gameContainer');
    for(let i = 0; i < 15; i++) {

        var row = document.createElement('tr');
        row.setAttribute('id', ('r!' + i));
        row.setAttribute('class', 'createRow');
        table.appendChild(row);
        var jsRow = [];

        for(let j = 0; j < 15; j++) {

            var col = document.createElement('td');
            col.setAttribute('id', ('c!' + j));
            col.setAttribute('class', 'createCol');

            col.addEventListener('drop', (event) => {
                if(event.target.classList.value === 'createCol') {
                    event.preventDefault();
                    var data = event.dataTransfer.getData('Text');
                    event.target.appendChild(document.getElementById(data));

                    const enemyHolder = document.getElementById('enemyH');

                    if(enemyHolder.firstChild === null) {
                        enemyCount++;
                        const image = document.createElement('img');
                        image.src = '../gamemaker-media/enemy.jpg';
                        image.id = 'enemy' + enemyCount;
                        image.setAttribute('class', 'character enemy');
                        image.setAttribute('draggable', 'true');
                        image.addEventListener('dragstart', (event) => {
                            event.dataTransfer.setData('Text', event.target.id);
                        });
                        enemyHolder.appendChild(image);
                    }

                    const obstacleHolder = document.getElementById('obstacleH');

                    if(obstacleHolder.firstChild === null) {
                        obstacleCount++;
                        const image = document.createElement('img');
                        image.src = '../gamemaker-media/obstacle.jpg';
                        image.id = 'obstacle' + obstacleCount;
                        image.setAttribute('class', 'character obstacle');
                        image.setAttribute('draggable', 'true');
                        image.addEventListener('dragstart', (event) => {
                            event.dataTransfer.setData('Text', event.target.id);
                        });
                        obstacleHolder.appendChild(image);
                    }
                }
            });

            col.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            var appendCol = document.getElementById('r!' + i);
            appendCol.appendChild(col);
            jsRow.push('*');
        }

        jsGrid.push(jsRow);
    }

};

function updateGrid() {

    const columns = document.getElementsByTagName('td');

    for(let i = 0; i < columns.length; i++) {
        if(columns[i].firstChild !== null) {
            var X = columns[i].parentNode.id.split('!')[1];
            var Y = columns[i].id.split('!')[1];

            if(columns[i].firstChild.id === 'player') {
                jsGrid[X][Y] = 'P';
            } else if(columns[i].firstChild.id.includes('enemy')) {
                jsGrid[X][Y] = 'E';
            } else if(columns[i].firstChild.id === 'goal') {
                jsGrid[X][Y] = 'G';
            } else if(columns[i].firstChild.id.includes('obstacle')) {
                jsGrid[X][Y] = 'O';
            }
        }
    }
};

drag();
createBoard();

var inputTitle = document.getElementById('title');
var inputSummary = document.getElementById('summary');
var inputDt = document.getElementById('dt');
var inputRating = document.getElementById('rating');
var inputDp = document.getElementById('dp');
var playerFunction = document.getElementsByClassName('player_function');
var enemyFunction = document.getElementsByClassName('enemy_function');

var formCreate = document.getElementById('create-form').addEventListener('submit', (event) => {
    event.preventDefault();
    updateGrid();

    for (let i = 0; i < playerFunction.length; i++ ) {
        if(playerFunction[i].checked) {
            playerFunction = playerFunction[i];
        }
    }

    for (let i = 0; i < enemyFunction.length; i++ ) {
        if(enemyFunction[i].checked) {
            enemyFunction = enemyFunction[i];
        }
    }

    ajaxPost(inputTitle.value, inputSummary.value, inputDt.value, inputRating.value, inputDp.value, playerFunction.value, enemyFunction.value);
});

function ajaxPost(title, summary, dt, rating, dp, playerBehaviour, enemyBehaviour) {

    let ajaxUrl = '/game-maker';

    var request = new XMLHttpRequest();

    function responseHandler() {
        var link = JSON.parse(this.responseText);
        window.location = link['link'];
    };

    request.addEventListener('load', responseHandler);

    request.open('POST', ajaxUrl, true);

    request.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    var inputs = {
        title: title,
        summary: summary,
        dt: dt,
        rating: rating,
        dp: dp,
        map: jsGrid,
        player_function: playerBehaviour,
        enemy_function: enemyBehaviour

    }

    request.send(`content=${JSON.stringify(inputs)}`);

};













