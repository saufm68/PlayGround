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
                return <a key={element.id} href={link}><img src={element.displayimage} alt={element.title} className="rounded mr-1" width="200px" height="200px" /></a>
            });
        }

        if (this.props.amateur.length > 0) {

            amateur = this.props.amateur.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img src={element.displayimage} alt={element.title} className="rounded mr-1" width="200px" height="200px" /></a>
            });
        }

        if (this.props.gamemaker.length > 0) {

            gamemaker = this.props.gamemaker.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img src={element.displayimage} alt={element.title} className="rounded mr-1" width="200px" height="200px" /></a>
            });
        }

        if (this.props.leaderboard.length > 0) {

            leaderboard = this.props.leaderboard.map((element) => {
                let link = `/games/${element.id}`;
                if (element.pro == true) {
                   return <div key={element.id}><h6 className="neon-green">Top Professional Game</h6><a href={link}><p className="mb-2">{element.title}</p></a></div>
                } else if (element.gamemaker == true) {
                   return <div key={element.id}><h6 className="neon-green">Top Amatuer Game</h6><a href={link}><p className="mb-2">{element.title}</p></a></div>
                } else {
                   return <div key={element.id}><h6 className="neon-green">Top Gamemaker Game</h6><a href={link}><p className="mb-2">{element.title}</p></a></div>
                }
            });
        }

        return (

            <Default cookie={this.props.cookie}>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className='border-bottom-neon mb-2'>
                            <h4 className='neon-green d-inline-block mb-0'>PROFESSIONAL GAMES</h4>
                            <a className='neon-green float-right' href="/search?show=pro">View All</a>
                        </div>
                        <div className='wrapper mb-2'>{pro}</div>
                        <div className='border-bottom-neon mb-2'>
                            <h4 className='neon-green d-inline-block mb-0'>AMATEUR GAMES</h4>
                            <a className='neon-green float-right' href="/search?show=amateur">View All</a>
                        </div>
                        <div className='wrapper mb-2'>{amateur}</div>
                        <div className='border-bottom-neon mb-2'>
                            <h4 className='neon-green d-inline-block mb-0'>GAME MAKER</h4>
                            <a className='neon-green float-right' href="/search?show=gamemaker">View All</a>
                        </div>
                        <div className='wrapper mb-3'>{gamemaker}</div>
                    </div>
                    <div className="col-12 col-lg-4 border-left-neon">
                        <div className='leaderboard border-all-neon text-center'>
                            <h3 className="neon-green border-bottom-neon mt-1 mb-3 pb-2">LeaderBoard</h3>
                            {leaderboard}
                        </div>
                        <div className="forum border-all-neon mt-2">
                        </div>
                    </div>
                </div>
            </Default>
    )};
};

module.exports = Home;