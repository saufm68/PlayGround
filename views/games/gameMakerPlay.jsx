const React = require('react');
const Default = require('../layout/default');

class GameMakerPlay extends React.Component {

    render() {

        return(

            <Default cookie={this.props.cookie}>
                <script type="text/javascript" src='/js/play.js'></script>
            </Default>

    )};
};

module.exports = GameMakerPlay;
