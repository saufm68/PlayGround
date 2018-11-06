const React = require('react');

class Default extends React.Component {

    render() {

        if (this.props.cookie.loginStatus === this.props.cookie.check) {

            let profile = `/users/${this.props.cookie.userId}`;
            let currentUser = this.props.cookie.username;

            var uploadGame = <div>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/games/new">Upload Game</a>
                                <a className="dropdown-item" href="/game-maker/creator">Create Game</a>
                            </div>

            var login = <div className="dropdown float-right mt-2">
                          <button className="btn bg-dark dropdown-toggle neon-green" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {currentUser}
                          </button>
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href={profile}>Profile</a>
                            <div className="dropdown-divider"></div>
                            <form id='logout' method='POST' action='/logout'><input className="dropdown-item" type='submit' value='Logout' /></form>
                          </div>
                        </div>

        } else {

            var uploadGame;
            var login = <a className="btn bg-dark neon-green float-right mt-2" href="/login" role="button">Log In/Register</a>
        }

        return(

            <html>
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                    <link rel="stylesheet" type="text/css" href="/css/style.css" />
                    <link rel="stylesheet" type="text/css" href="/css/main.css" />
                    <title>PlayGround</title>
                </head>
                <body>
                    <div className='fluid-container mt-1 body-content'>
                        <div className="row">
                            <div className="col">
                                <h1 className='title'><a href='/' className='neon-green'>PlayGround</a></h1>
                            </div>
                            <div className='col'>
                                {login}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Game
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a className="dropdown-item" href="/search?show=pro">Pro Games</a>
                                                    <a className="dropdown-item" href="/search?show=amateur">Amateur Games</a>
                                                    <a className="dropdown-item" href="/search?show=gamemaker">Game Maker</a>
                                                    {uploadGame}
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Tag
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=action">Action</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=adventure">Adventure</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=quiz">Quiz</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=puzzle">Puzzle</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=horror">Horror</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=retro">Retro</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=fantasy">Fantasy</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=rpg">RPG</a>
                                                    <a className="dropdown-item" href="/search?topic=tags&&show=educational">Educational</a>
                                                </div>
                                            </li>
                                        </ul>
                                        <form className="form-inline my-2 my-lg-0" method='GET' action='/search'>
                                            <input type='hidden' name='topic' value='name'/>
                                            <input id='search-text' type='text' name='show' className="form-control mr-sm-2" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                        </form>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <main className="mt-3">
                            {this.props.children}
                        </main>
                    </div>
                    <div className="fluid-container">
                        <footer className="bg-dark mt-4">
                        </footer>
                    </div>
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>
                    <script type="text/javascript" src='/js/script.js'></script>
                </body>
            </html>
    )};
};

module.exports = Default;
