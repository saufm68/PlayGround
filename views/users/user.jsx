const React = require('react');
const Default = require('../layout/default');

class User extends React.Component {

    render() {

        if(this.props.user.list.length > 0) {

            var list = this.props.user.list.map((element) => {

                let linkUrl = `/games/${element.id}`

                return <a key={element.id} href={linkUrl}><img className='gameDisplay' src={element.displayimage} /></a>
            });

        } else {
            var list = <h1>Has Yet To Upload Game</h1>
        }


        let editUrl = `/users/${this.props.user.id}/edit`;
        let deleteUrl = `/users/${this.props.user.id}?_method=delete`;

        if (this.props.cookie.loginStatus === this.props.cookie.check && this.props.cookie.userId == this.props.user.id) {

            var editButton = <a href={editUrl}><button className='profile-edit'>Edit</button></a>
            var deleteButton = <form className='deleteButton' method='POST' action={deleteUrl}>
                <input className='profile-delete' type='submit' value='Delete' />
                </form>
        } else {
            var editButton;
            var deleteButton;
        }

        return(

            <Default cookie={this.props.cookie} title='Profile'>
                <div className='full-content-container'>
                    <img className='game-pic' src={this.props.user.profilepic} />
                    <div className='bio-container'>
                        <h2 className='header'>Biography</h2>
                        <div className='info profile'>
                            <p>Username: {this.props.user.username}</p>
                            <p>Age: {this.props.user.age}</p>
                            <p>Description: {this.props.user.biography}</p>
                        </div>
                        <div className='profile-ui'>
                            {editButton}
                            {deleteButton}
                        </div>
                    </div>
                    <div className='game-list-container'>
                        <h2 className='header'>List Of Games</h2>
                        <div className='gameScroll'>
                            {list}
                        </div>
                    </div>
                </div>
            </Default>
    )};
};

module.exports = User;