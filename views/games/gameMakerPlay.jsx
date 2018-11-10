const React = require('react');
const Default = require('../layout/default');

class GameMakerPlay extends React.Component {

    render() {

        return(

            <Default cookie={this.props.cookie}>
                <div id="instructions" className="border-all-neon bg-dark text-center p-4 mx-auto">
                    <h1 className="neon-green mb-3">Instructions</h1>
                    <p className="neon-green text-center mb-5"><b>Use the keys W,S,A,D to move your character up, down, left, right respectively.</b><br/>
                        The objective is to reach the goal on the map while avoiding the enemies.
                        <br/><br/>
                        Depending on the creator:<br/>
                        * The enemy will either move in a random manor or chase after your character<br/>
                        * Your character may/may not be able to go out of the border.<br/>
                        (In the event that your character can go out of the border, your character will re-appear on the opposite end of the map.)
                    </p>
                    <button id="start-gamemaker-play" className="btn btn-outline-success mx-auto px-5">Start</button>
                </div>
                <script type="text/javascript" src='/js/play.js'></script>
            </Default>

    )};
};

module.exports = GameMakerPlay;
