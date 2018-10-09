const React = require('react');
const Default = require('../layout/default.jsx');

class Home extends React.Component {

    render() {

        let pro;
        let amateur;

        return (

            <Default title='PlayGround'>
                <h2>PROFESSIONAL GAMES</h2>
                <div className='wrapper'>{pro}</div>
                <h2>AMATEUR GAMES</h2>
                <div className='wrapper'>{amateur}</div>
            </Default>
    )};
};

module.exports = Home;