const React = require('react');

class Default extends React.Component {

    render() {

        if (this.props.cookie.loginStatus === this.props.cookie.check) {

            let profile = `/profile/${this.props.cookie.userId}`;
            let currentUser = this.props.cookie.username;

            var uploadGame = <a href='/upload'><button>Upload Game</button></a>
            var login = <div><a href={profile}>{currentUser}</a><button className='drop-down'></button>
                <span className='logout'>Log Out</span></div>

        } else {

            var uploadGame;
            var login = <a href='/login'><button>Log In/Register</button></a>
        }

        return(

            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <header>
                        <div className='top-header'>
                            <h1>PlayGround</h1>
                            <div className='uploadGame'>{uploadGame}</div>
                            <div className='login'>{login}</div>
                        </div>
                        <div className='bottom-header'>
                            <a href='/pro'><button>Pro Games</button></a>
                            <a href='/amateur'><button>Amateur Games</button></a>
                            <form method='GET' action='/' className='search'>
                                <select className='search-topic' name='topic'>
                                    <option value='tags'>Tags</option>
                                    <option value='name'>Name</option>
                                    <option value='rating'>Rating</option>
                                </select>
                                <input type='text' name='search'/>
                                <input type='submit' value='search' />
                            </form>
                        </div>
                    </header>
                    <main>
                        {this.props.children}
                    </main>
                    <footer>
                    </footer>
                </body>
            </html>
    )};
};

module.exports = Default;
