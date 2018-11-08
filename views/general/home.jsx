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

        if (this.props.cookie.loginStatus === this.props.cookie.check) {
            var user = <span>
                            <input id='userId-input' type='hidden' name='user_id' value={this.props.cookie.userId} />
                            <input id='username-input' type='hidden' name='username' value={this.props.cookie.username} />
                       </span>
            var disableForum = <input className='forum-submit btn btn-outline-success' type='submit' value='Submit' />
        } else {
            var user;
            var disableForum = <input className='forum-submit btn btn-outline-success' type='submit' value='Submit' disabled />
        }

        return (

            <Default cookie={this.props.cookie}>
                <div className="row">
                    <div className="col-8">
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
                    <div className="col-4 border-left-neon">
                        <div className='leaderboard border-all-neon text-center'>
                            <h3 className="neon-green border-bottom-neon mt-1 mb-3 pb-2">LeaderBoard</h3>
                            {leaderboard}
                        </div>
                        <div className="forum border-all-neon mt-2">
                            <div id="forum-list" className="forum-list bg-dark p-2">
                            </div>
                            <form id='forum-form' className='forum-form'>
                                {user}
                                <div className="input-group">
                                    <textarea id='forum-input' className='comments-text bg-dark neon-green form-control' name='message' placeholder='Say something...'></textarea>
                                    <div className="input-group-append">
                                        {disableForum}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <script src="/socket.io/socket.io.js"></script>
                <script src='/js/forum.js'></script>
            </Default>
    )};
};

module.exports = Home;