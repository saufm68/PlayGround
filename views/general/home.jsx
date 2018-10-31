const React = require('react');
const Default = require('../layout/default.jsx');

class Home extends React.Component {

    render() {

        let pro;
        let amateur;
        let gamemaker;
        let leaderboard;

        if (this.props.pro.length > 0) {

            pro = this.props.pro.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img className='gameDisplay' src={element.displayimage} /></a>
            });
        }

        if (this.props.amateur.length > 0) {

            amateur = this.props.amateur.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img className='gameDisplay' src={element.displayimage} /></a>
            });
        }

        if (this.props.gamemaker.length > 0) {

            gamemaker = this.props.gamemaker.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img className='gameDisplay' src={element.displayimage} /></a>
            });
        }

        if (this.props.leaderboard.length > 0) {

            leaderboard = this.props.leaderboard.map((element) => {
                let link = `/games/${element.id}`;
                if (element.pro == true) {
                   return <div key={element.id}><h6>Top Professional Game</h6><a href={link}><p>{element.title}</p></a></div>
                } else if (element.gamemaker == true) {
                   return <div key={element.id}><h6>Top Amatuer Game</h6><a href={link}><p>{element.title}</p></a></div>
                } else {
                   return <div key={element.id}><h6>Top Gamemaker Game</h6><a href={link}><p>{element.title}</p></a></div>
                }
            });
        }

        return (

            <Default cookie={this.props.cookie} title='PlayGround'>
                <h2 className='header'>PROFESSIONAL GAMES</h2>
                <div className='wrapper'>{pro}</div>
                <h2 className='header'>AMATEUR GAMES</h2>
                <div className='wrapper'>{amateur}</div>
                <h2 className='header'>GAME MAKER</h2>
                <div className='wrapper'>{gamemaker}</div>
                <div>
                    <h2>LeaderBoard</h2>
                    <div className='leaderBoard'>{leaderboard}</div>
                </div>
            </Default>
    )};
};

module.exports = Home;