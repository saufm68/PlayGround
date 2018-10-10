const React = require('react');
const Structure = require('../layout/structure');

class Error500 extends React.Component {

    render() {

        return(

            <Structure title='500'>
            <h1>ERROR 500</h1>
            <h2>There seems to be something wrong with the server</h2>
            </Structure>
    )};
};

module.exports = Error500;