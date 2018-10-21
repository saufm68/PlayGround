const React = require('react');
const Default = require('../layout/default');

class GameMakerPlay extends React.Component {

    render() {

        return(

            <Default cookie={this.props.cookie} title='Play'>
                <script type="module" src='/js/functions.js'></script>
                <script type="module" src='/js/play.js'></script>
            </Default>

    )};
};

module.exports = GameMakerPlay;
