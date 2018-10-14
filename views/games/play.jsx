const React = require('react');
const Default = require('../layout/default');

class Play extends React.Component {

    render() {

        return (

            <Default cookie={this.props.cookie} title='Play'>
                <embed src={this.props.link} />
            </Default>
    )};
};

module.exports = Play;