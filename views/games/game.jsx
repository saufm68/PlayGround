const React = require('react');
const Default = require('../layout/default');

class Game extends React.Component {

    render() {


        let editUrl = `/games/${this.props.currentPost}/edit`;
        let deleteUrl = `/games/${this.props.currentPost}?_method=delete`;
        let author = `/users/${this.props.game.author_id}`;
        let comments;


        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        if (this.props.comments.length > 0) {

            comments = this.props.comments.map((element) => {

                let userLink = `/users/${element.user_id}`;

                return <div key={element.id} className='specific-comment'>
                    <div>
                        <h3 className='comment-header left'><a href={userLink}>{element.username}</a></h3>
                        <h3 className='comment-header right'>{element.dt}</h3>
                    </div>
                    <p className='comment-body'>{element.message}</p>
                    </div>
            });
        }

        if(this.props.game.tags.length > 0) {
            var tags = this.props.game.tags.map((element) => {

                const linkTag = `/search?topic=tags&show=${element.tag}`;

                return <a key={element.id} href={linkTag}><span className='single-tag'>{element.tag}</span></a>
            });
        }

        if (this.props.game.pro === true) {
            var admin = <a href={this.props.game.link}>Click To Purchase</a>
            var category = <a href="/search?show=pro">Professional Game</a>
        } else {
            if (this.props.game.gamemaker == true) {
                var playLink = `/game-maker/play/${this.props.game.id}`;
                var category = <a href="/search?show=gamemaker">Gamemaker Game</a>
            } else {
                var playLink = `/play/${this.props.game.id}`;
                var category = <a href="/search?show=amatuer">Amatuer Game</a>
            }
            var admin = <a href={playLink}>Click To Play</a>
        }

        if(this.props.cookie.loginStatus === this.props.cookie.check) {
            var disabled = <input id='rate-button' type='submit' value='Rate' />
            var disableComment = <form id='comment-form' className='comment-form' method='POST'>
                <textarea id='comment-input' className='comments-text' name='message' placeholder='Comment on the game'></textarea>
                <input id='postId-input' type='hidden' name='post_id' value={this.props.currentPost} />
                <input id='userId-input' type='hidden' name='user_id' value={this.props.cookie.userId} />
                <input id='dt-input' type='hidden' name='dt' value={date} />
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
            var disableComment = <form id='comment-form' className='comment-form' method='POST'>
                <textarea id='comment-input' className='comments-text' name='message' placeholder='Comment on the game' disabled></textarea>
                <input id='postId-input' type='hidden' name='post_id' value={this.props.currentPost} />
                <input id='userId-input' type='hidden' name='user_id' value={this.props.cookie.userId} />
                <input id='dt-input' type='hidden' name='dt' value={date} />
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
                            <p>Category: {category}</p>
                            <p>Rated By: <span id='ratedBy'> {this.props.game.rated} </span> people</p>
                            {admin}
                        </div>
                    </div>
                    <div className='score-container'>
                        <h1 className='score-header'>Score:</h1>
                        <h1 id='score'>{this.props.game.rating}</h1>
                        <form id='rating-form' method='POST'>
                            <input id='rating-input' type='number' name='rating' max='10' min='0' placeholder='Rate the game' />
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
                    <div className='comments-link'>Comments</div>
                    <div className='comments'>
                        <div className='comments-list' id='allComments'>
                            {comments}
                        </div>
                        {disableComment}
                    </div>
                    <script type="text/javascript" src='/js/rate.js'></script>
                </div>
            </Default>
    )};
};

module.exports = Game;