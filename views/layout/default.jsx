const React = require('react');

class Default extends React.Component {

    render() {

        if (this.props.cookie.loginStatus === this.props.cookie.check) {

            let profile = `/users/${this.props.cookie.userId}`;
            let currentUser = this.props.cookie.username;

            var uploadGame = <div className='uploadGame'><a href='/games/new'><button className='upload'>Upload Game</button></a>
                            <a href='/game-maker/creator'><button className='upload'>Create Game</button></a></div>
            var login = <div><a className='user' href={profile}>{currentUser}</a><button id='drop-down'></button>
                <form id='logout' method='POST' action='/logout'><input type='submit' value='Logout' /></form>
                </div>

        } else {

            var uploadGame;
            var login = <a href='/login'><button id='login-register'>Log In/Register</button></a>
        }

        return(

            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/css/style.css" />
                    <link rel="stylesheet" type="text/css" href="/css/main.css" />
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <div className='container'>
                        <header>
                            <div className='top-header'>
                                <h1 className='title'>PlayGround</h1>
                                {uploadGame}
                                <div className='login'>{login}</div>
                            </div>
                            <div className='bottom-header'>
                                <a href='/search?show=pro'><button className='linkButton'>Pro Games</button></a>
                                <a href='/search?show=amateur'><button className='linkButton'>Amateur Games</button></a>
                                <a href='/search?show=gamemaker'><button className='linkButton'>Game Maker</button></a>
                                <a href='/'><button className='linkButton'>Home</button></a>
                                <form method='GET' action='/search' className='search'>
                                    <select className='search-topic' name='topic'>
                                        <option value='tags'>Tags</option>
                                        <option value='name'>Name</option>
                                        <option value='rating'>Rating</option>
                                    </select>
                                    <input id='search-text' type='text' name='show' placeholder='Search Games, Tags, Rating'/>
                                    <input id='submit' type='submit' value='Search' />
                                </form>
                            </div>
                        </header>
                        <main>
                            {this.props.children}
                        </main>
                        <footer>
                        </footer>
                    </div>
                    <script type="text/javascript" src='/js/script.js'></script>
                </body>
            </html>
    )};
};

module.exports = Default;
