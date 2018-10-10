const React = require('react');
const Default = require('../layout/Default');

class User extends React.Component {

    render() {

        if(this.props.user.list.length > 0) {

            var list = this.props.user.list.map((element) => {

                let linkUrl = `/games/${element.id}`

                return <div key={element.id}><a href={linkUrl}><img src={element.displayimage} /></a></div>
            });

        } else {
            var list = <h1>Has Yet To Upload Game</h1>
        }


        let editUrl = `/users/${this.props.user.id}/edit`;
        let deleteUrl = `/users/${this.props.user.id}?_method=delete`;

        if (this.props.cookie.loginStatus === this.props.cookie.check && this.props.cookie.userId == this.props.user.id) {

            var editButton = <a href={editUrl}><button>Edit</button></a>
            var deleteButton = <form className='deleteButton' method='POST' action={deleteUrl}>
                <input type='submit' value='Delete' />
                </form>
        } else {
            var editButton;
            var deleteButton;
        }

        return(

            <Default cookie={this.props.cookie} title='Profile'>
                <img src={this.props.user.profilepic} />
                <div className='bio-containner'>
                    <h2>Biography</h2>
                    <p>Username: {this.props.user.username}</p>
                    <p>Age: {this.props.user.age}</p>
                    <p>Description: {this.props.user.biography}</p>
                    {editButton}
                    {deleteButton}
                </div>
                <div className='game-list'>
                    <h2>List Of Games</h2>
                    {list}
                </div>
            </Default>
    )};
};

module.exports = User;