const React = require('react');
const Default = require('../layout/default');

class Create extends React.Component {

    render() {
        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        return (

            <Default cookie={this.props.cookie}>
                <div className="row">
                    <div className="col-9">
                        <table id='gameContainer'>
                        </table>
                    </div>
                    <div className="col-3">
                        <div className='options container mb-2'>
                            <div className="row text-center top-header mb-1">
                                <div className="col-6">
                                    <h5 className="neon-green">PLAYER</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="neon-green">ENEMY</h5>
                                </div>
                            </div>
                            <div className="row text-center top-content">
                                <div className="col-6">
                                    <div className='holder border-all-neon mx-auto rounded'><img className='character' id='player' draggable='true' src='/gamemaker-media/player.jpg' /></div>
                                </div>
                                <div className="col-6">
                                    <div id='enemyH' className='holder border-all-neon mx-auto rounded'><img className='character enemy' id='enemy' draggable='true' src='/gamemaker-media/enemy.jpg' /></div>
                                </div>
                            </div>
                            <div className="row text-center bottom-header mb-1 mt-3">
                                <div className="col-6">
                                    <h5 className="neon-green">OBSTACLE</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="neon-green">GOAL</h5>
                                </div>
                            </div>
                            <div className="row text-center bottom-content mb-3">
                                <div className="col-6">
                                    <div id='obstacleH' className='holder border-all-neon mx-auto rounded'><img className='character obstacle' id='obstacle' draggable='true' src='/gamemaker-media/obstacle.jpg' /></div>
                                </div>
                                <div className="col-6">
                                    <div className='holder border-all-neon mx-auto rounded'><img className='character' id='goal' draggable='true' src='/gamemaker-media/goal.jpg' /></div>
                                </div>
                            </div>
                        </div>
                        <form id='create-form' >
                            <h4 className="neon-green mt-5">Player Behaviour: </h4>
                            <input className="player_function" type='radio' name='player_function' value='bordersPlayer' defaultChecked /><span className="neon-green">Disable going out of border</span> <br/>
                            <input className="player_function" type='radio' name='player_function' value='noBordersPlayer' /><span className="neon-green">Enable going out of border</span> <br/>
                            <h4 className="neon-green mt-3">Enemy Behaviour: </h4>
                            <input className="enemy_function" type='radio' name='enemy_function' value='noGravityEnemyChase' defaultChecked /><span className="neon-green">Chase Player</span> <br/>
                            <input className="enemy_function" type='radio' name='enemy_function' value='noGravityEnemyRandom' /><span className="neon-green">Random Movements</span> <br/>
                            <input id='dt' type='hidden' name='dt' value={date} />
                            <input id='rating' type='hidden' name='rating' value='0' />
                            <input id='dp' type='hidden' name='displayimage' value='/gamemaker-media/player.jpg' />
                        </form>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <h3 className="neon-green">Title:</h3>
                        <input className="bg-dark form-control neon-green longText" id='title' type='text' name='title' form="create-form" required autoComplete="off" />
                        <h3 className="neon-green mt-2">Summary:</h3>
                        <textarea className="bg-dark form-control neon-green longText" id='summary' name='summary' placeholder='Enter a short summary. Best to put which functions was chosen for both enemy behaviours and player behaviours.' form="create-form" required></textarea>
                        <input className="btn btn-outline-success btn-block mt-4" type='submit' value='Create Stage' form="create-form" />
                    </div>
                </div>
                <script type="text/javascript" src='/js/creator.js'></script>
            </Default>
    )};
};

module.exports = Create;