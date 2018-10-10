const React = require('react');
const Default = require('../layout/Default');

class Game extends React.Component {

    render() {


        let editUrl = `/games/${this.props.currentPost}/edit`;
        let deleteUrl = `/games/${this.props.currentPost}?_method=delete`;
        let rateUrl = `/games/${this.props.currentPost}`
        let commentUrl =`/games/${this.props.currentPost}/comments`

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        if(this.props.game.tags.length > 0) {
            var tags = this.props.game.tags.map((element) => {
                return <span key={element.id} className='single-tag'>{element.tag}</span>
            });
        }

        if(this.props.cookie.loginStatus === this.props.cookie.check && this.props.cookie.userId == this.props.game.author_id) {

            var disabled = <input type='submit' value='Rate' />
            var editButton = <a href={editUrl}><button>Edit</button></a>
            var deleteButton = <form className='deleteButton' method='POST' action={deleteUrl}>
                <input type='submit' value='Delete' />
                </form>
            var disableComment = <form method='POST' action={commentUrl}>
                <textarea className='comments-text' name='message'></textarea>
                <input type='hidden' name='post_id' value={this.props.currentPost} />
                <input type='hidden' name='user_id' value={this.props.cookie.userId} />
                <input type='hidden' name='dt' value={date} />
                <input type='submit' value='Submit' />
                </form>

        } else {

            var editButton;
            var deleteButton;
            var disabled = <input type='submit' value='Rate' disabled />
            var disableComment = <form method='POST' action={commentUrl}>
                <textarea className='comments-text' name='message' disabled></textarea>
                <input type='submit' value='Submit' disabled />
                </form>
        }

        return (
            <Default cookie={this.props.cookie} title={this.props.game.title}>
                <img src={this.props.game.displayimage}/>
                <div className='information-container'>
                    <h2>Information</h2>
                    <p>Creator: {this.props.game.username}</p>
                    <p>Rated By: {this.props.game.rated} people</p>
                    <a href={this.props.game.link}>Click To Purchase</a>
                </div>
                <div className='score-container'>
                    <h1>Score</h1>
                    <h1>{this.props.rating}</h1>
                    <form id='rating-form' method='POST' action={rateUrl}>
                        <input type='number' name='rating' max='5' min='0' />
                        {disabled}
                    </form>
                </div>
                <div className='summary-container'>
                    <h2>{this.props.game.title}</h2>
                    <p>{this.props.game.summary}</p>
                    <span className='tags-container'>{tags}</span>
                    {editButton}
                    {deleteButton}
                </div>
                <div className='comments-link'><a href={commentUrl}>Comments</a></div>
                {disableComment}
            </Default>
    )};
};

module.exports = Game;