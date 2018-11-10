const React = require('react');
const Default = require('../layout/default');

class Play extends React.Component {

    render() {

        return (

            <Default cookie={this.props.cookie}>
                <embed className="border-all-neon" src={this.props.link} />
                <script type="text/javascript" src='/js/scrolllock.js'></script>
            </Default>
    )};
};

module.exports = Play;