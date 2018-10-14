const React = require('react');
const Default = require('../layout/Default');

class Game extends React.Component {

    render() {


        let editUrl = `/games/${this.props.currentPost}/edit`;
        let deleteUrl = `/games/${this.props.currentPost}?_method=delete`;
        let rateUrl = `/games/${this.props.currentPost}`;
        let commentUrl =`/games/${this.props.currentPost}/comments`;
        let author = `/users/${this.props.game.author_id}`;

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        if(this.props.game.tags.length > 0) {
            var tags = this.props.game.tags.map((element) => {

                const linkTag = `/search?topic=tags&show=${element.tag}`;

                return <a key={element.id} href={linkTag}><span className='single-tag'>{element.tag}</span></a>
            });
        }

        if (this.props.game.author_id == 1) {
            var admin = <a href={this.props.game.link}>Click To Purchase</a>
        } else {
            const playLink = `/play/${this.props.game.id}`;
            var admin = <a href={playLink}>Click To Play</a>
        }

        if(this.props.cookie.loginStatus === this.props.cookie.check) {
            var disabled = <input id='rate-button' type='submit' value='Rate' />
            var disableComment = <form className='comment-form' method='POST' action={commentUrl}>
                <textarea className='comments-text' name='message' placeholder='Comment on the game'></textarea>
                <input type='hidden' name='post_id' value={this.props.currentPost} />
                <input type='hidden' name='user_id' value={this.props.cookie.userId} />
                <input type='hidden' name='dt' value={date} />
                <input className='submit-comments' type='submit' value='Submit' />
                </form>

            if(this.props.cookie.userId == this.props.game.author_id) {
                var editButton = <a href={editUrl}><button className='interactive-button'>Edit</button></a>
                var deleteButton = <form  method='POST' action={deleteUrl}>
                    <input className='interactive-button' type='submit' value='Delete' />
                    </form>
            } else {
                var editButton;
                var deleteButton;
            }
        } else {
            var disabled = <input id='rate-button' type='submit' value='Rate' disabled />
            var disableComment = <form className='comment-form' method='POST' action={commentUrl}>
                <textarea className='comments-text' name='message' placeholder='Comment on the game' disabled></textarea>
                <input className='submit-comments' type='submit' value='Submit' disabled />
                </form>
            var editButton;
            var deleteButton;
        }

        return (
            <Default cookie={this.props.cookie} title={this.props.game.title}>
                <div className='full-content-container'>
                    <img className='game-pic' src={this.props.game.displayimage}/>
                    <div className='information-container'>
                        <h2 className='header'>Information</h2>
                        <div className='info'>
                            <p>Uploader: <a href={author}>{this.props.game.username}</a></p>
                            <p>Rated By: {this.props.game.rated} people</p>
                            {admin}
                        </div>
                    </div>
                    <div className='score-container'>
                        <h1 className='score-header'>Score:</h1>
                        <h1 id='score'>{this.props.game.rating}</h1>
                        <form id='rating-form' method='POST' action={rateUrl}>
                            <input id='rating-input' type='number' name='rating' max='5' min='0' placeholder='Rate the game' />
                            {disabled}
                        </form>
                    </div>
                    <div className='summary-container'>
                        <h2 className='header'>{this.props.game.title}</h2>
                            <div className='summary'>
                                <p>{this.props.game.summary}</p>
                                <div className='tags-container'>{tags}</div>
                                <div className='ui-button'>
                                    {editButton}
                                    {deleteButton}
                                </div>
                            </div>
                    </div>
                    <div className='comments-link'><a href={commentUrl}>Comments</a></div>
                    {disableComment}
                    <script type="text/javascript" src='/js/rate.js'></script>
                </div>
            </Default>
    )};
};

module.exports = Game;