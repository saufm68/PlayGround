const React = require('react');
const Default = require('../layout/default');

class Create extends React.Component {

    render() {

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        return (

            <Default cookie={this.props.cookie} title='Creator'>
                <table id='gameContainer'>
                </table>
                <div className='options'>
                    <h1>PLAYER</h1>
                    <div className='holder'><img className='character' id='player' draggable='true' src='../gamemaker-media/player.jpg' /></div>
                    <h1>OBSTACLE</h1>
                    <div id='obstacleH' className='holder'><img className='character obstacle' id='obstacle' draggable='true' src='../gamemaker-media/obstacle.jpg' /></div>
                    <h1>ENEMY</h1>
                    <div id='enemyH' className='holder'><img className='character enemy' id='enemy' draggable='true' src='../gamemaker-media/enemy.jpg' /></div>
                    <h1>GOAL</h1>
                    <div className='holder'><img className='character' id='goal' draggable='true' src='../gamemaker-media/goal.jpg' /></div>
                </div>
                <button id='done'>Save</button>
                <form id='create-form' method='POST' action='/game-maker/creator'>
                    <h2>Title:</h2>
                    <input id='title' type='text' name='title' required />
                    <h2>Summary:</h2>
                    <textarea id='summary' name='summary' placeholder='Enter a short summary' required></textarea>
                    <input id='dt' type='hidden' name='dt' value={date} />
                    <input id='rating' type='hidden' name='rating' value='0' />
                    <input id='dp' type='hidden' name='displayimage' value='/dp/defaultpic.png' />
                    <input type='submit' value='Create Stage' />
                </form>
                <script type="text/javascript" src='/js/creator.js'></script>
            </Default>

    )};
};

module.exports = Create;