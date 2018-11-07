const React = require('react');
const Default = require('../layout/default');

class User extends React.Component {

    render() {

        if(this.props.user.list.length > 0) {

            var list = this.props.user.list.map((element) => {

                let linkUrl = `/games/${element.id}`

                return <a key={element.id} href={linkUrl}>
                            <div className="card bg-dark d-inline-block mr-3 mb-3 text-center" style={{width: 160 + "px"}}>
                              <img className="card-img-top" src={element.displayimage} width="160px" height="160px" alt={element.title} />
                              <div className="card-body bg-dark">
                                <h6 className="card-title neon-green mb-2">{element.title}</h6>
                                <p className="card-text neon-green"><i className="fas fa-star"></i> {element.rating}</p>
                              </div>
                            </div>
                        </a>
            });

        } else {
            var list = <h1>Has Yet To Upload/Create Game</h1>
        }


        let editUrl = `/users/${this.props.user.id}/edit`;
        let deleteUrl = `/users/${this.props.user.id}?_method=delete`;

        if (this.props.cookie.loginStatus === this.props.cookie.check && this.props.cookie.userId == this.props.user.id) {

            var editButton = <a className="float-right mt-2 mr-2" href={editUrl}>Edit</a>
            var deleteButton = <form className='deleteButton d-inline-block float-right' method='POST' action={deleteUrl}>
                                    <input className='profile-delete mt-2' type='submit' value='Delete' />
                                </form>


        } else {
            var editButton;
            var deleteButton
        }

        return(

            <Default cookie={this.props.cookie}>
                <div className='row'>
                    <div className="col-5 img-container">
                        <img src={this.props.user.profilepic} width="320px" height="300px" />
                    </div>
                    <div className="col-7">
                        <div className="card bg-dark border-all-neon" style={{width: 100 + '%', height: 300 + 'px'}}>
                            <div className="card-body">
                                <div className="profile-title border-bottom-neon mb-3">
                                    <h3 className="card-title neon-green d-inline-block mb-1">{this.props.user.username}</h3>
                                    {deleteButton}
                                    {editButton}
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted">Biography</h6>
                                <div className='profile-bio'>
                                    <p className="card-text neon-green">Age: {this.props.user.age}</p>
                                    <p className="card-text neon-green mb-2">Description:</p>
                                    <p className="card-text neon-green">{this.props.user.biography}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col game-list-container '>
                        <h3 className='neon-green border-bottom-neon mb-3'>List Of Games</h3>
                        <div className='gameScroll'>
                            {list}
                        </div>
                    </div>
                </div>
            </Default>
    )};
};

module.exports = User;