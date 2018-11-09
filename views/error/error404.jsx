const React = require('react');
const Structure = require('../layout/structure');

class Error404 extends React.Component {

    render() {

        return(

            <Structure>
                <h1>ERROR 404</h1>
                <h2>Request Not Found</h2>
            </Structure>
    )};
};

module.exports = Error404;