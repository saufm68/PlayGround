const React = require('react');
const Default = require('../layout/default.jsx');

class Home extends React.Component {

    render() {

        let pro;
        let amateur;

        if (this.props.pro.length > 0 && this.props.pro.length > 0) {

            pro = this.prop.pro.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img className='gameDisplay' src={element.displayimage} /></a>
            });

            amateur = this.prop.amateur.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img className='gameDisplay' src={element.displayimage} /></a>
            });

        }

        return (

            <Default cookie={this.props.cookie} title='PlayGround'>
                <h2>PROFESSIONAL GAMES</h2>
                <div className='wrapper'>{pro}</div>
                <h2>AMATEUR GAMES</h2>
                <div className='wrapper'>{amateur}</div>
            </Default>
    )};
};

module.exports = Home;