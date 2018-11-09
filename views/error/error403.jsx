const React = require('react');
const Structure = require('../layout/structure');

class Error403 extends React.Component {

    render() {

        return(

            <Structure>
                <h1>ERROR 403</h1>
                <h2>Restricted Access</h2>
            </Structure>
    )};
};

module.exports = Error403;h