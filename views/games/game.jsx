const React = require("react");
const Default = require("../layout/default");

class Game extends React.Component {
  render() {
    let editUrl = `/games/${this.props.currentPost}/edit`;
    let deleteUrl = `/games/${this.props.currentPost}?_method=delete`;
    let author = `/users/${this.props.game.author_id}`;
    let comments;

    if (this.props.comments.length > 0) {
      comments = this.props.comments.map(element => {
        let userLink = `/users/${element.user_id}`;

        return (
          <div key={element.id}>
            <p className="d-inline-block my-1 mr-2">
              <a href={userLink}>
                {element.username} - {element.dt_simplified}:
              </a>
            </p>
            <p className="d-inline-block neon-green my-1">{element.message}</p>
          </div>
        );
      });
    }

    if (this.props.game.tags.length > 0) {
      var tags = this.props.game.tags.map(element => {
        const linkTag = `/search?topic=tags&show=${element.tag}`;

        return (
          <a
            key={element.id}
            href={linkTag}
            className="neon-green d-inline-block ml-3"
          >
            {element.tag}
          </a>
        );
      });
    }

    if (this.props.game.gamemaker == true) {
      var playLink = `/game-maker/play/${this.props.game.id}`;
      var category = <a href="/search?show=gamemaker">Gamemaker</a>;
    } else {
      var playLink = `/play/${this.props.game.id}`;
      var category = <a href="/search?show=amatuer">Amatuer</a>;
    }

    if (this.props.cookie.loginStatus === this.props.cookie.check) {
      var disabled = (
        <input
          id="rate-button"
          className="btn btn-outline-success"
          type="submit"
          value="Rate"
        />
      );
      var disableComment = (
        <input
          className="submit-comments btn btn-outline-success"
          type="submit"
          value="Comment"
        />
      );

      if (this.props.cookie.userId == this.props.game.author_id) {
        var editButton = (
          <a href={editUrl} className="float-right mt-0 mr-2">
            Edit
          </a>
        );
        var deleteButton = (
          <form
            className="float-right d-inline-block"
            method="POST"
            action={deleteUrl}
          >
            <input className="game-delete mt-0" type="submit" value="Delete" />
          </form>
        );
      } else {
        var editButton;
        var deleteButton;
      }
    } else {
      var disabled = (
        <input
          id="rate-button"
          className="btn btn-outline-success"
          type="submit"
          value="Rate"
          disabled
        />
      );
      var disableComment = (
        <input
          className="submit-comments btn btn-outline-success"
          type="submit"
          value="Comment"
          disabled
        />
      );
      var editButton;
      var deleteButton;
    }

    if (this.props.game.rated == 1) {
      var grammar = "person";
    } else {
      var grammar = "people";
    }

    return (
      <Default cookie={this.props.cookie}>
        <div className="row">
          <div className="col-12 col-md-5 img-container">
            <img
              src={this.props.game.displayimage}
              width="320px"
              height="300px"
            />
          </div>
          <div className="col-12 col-md-7 padding-l-xtra">
            <div
              className="card bg-dark border-all-neon"
              style={{ width: 100 + "%", height: 210 + "px" }}
            >
              <div className="card-body pt-2">
                <div className="profile-title border-bottom-neon mb-2">
                  <h4 className="card-title neon-green d-inline-block mb-1">
                    {this.props.game.title}
                  </h4>
                </div>
                <div className="info d-inline-block">
                  <p className="card-text neon-green mb-2">
                    Uploader: <a href={author}>{this.props.game.username}</a>
                  </p>
                  <p className="card-text neon-green mb-2">
                    Category: {category}
                  </p>
                  <p className="card-text neon-green mb-3">
                    Rated By:
                    <span id="ratedBy" className="mx-1">
                      {this.props.game.rated}
                    </span>
                    {grammar}
                  </p>
                  <a href={playLink}>Click To Play</a>
                </div>
                <div className="tags-container border-left-neon d-inline-block float-right">
                  <p className="neon-green ml-3 mb-1">Tags:</p>
                  {tags}
                </div>
              </div>
            </div>
            <div className="score-container mt-3 rounded border-all-neon p-2">
              <h1 className="neon-green d-inline-block mx-2 score-mobile">
                Score:
              </h1>
              <h1 className="neon-green d-inline-block score-mobile" id="score">
                {this.props.game.rating}
              </h1>
              <form
                id="rating-form"
                className="d-inline-block float-right mt-2 rate-mobile"
                method="POST"
              >
                <div className="input-group">
                  <input
                    className="bg-dark neon-green form-control"
                    id="rating-input"
                    type="number"
                    name="rating"
                    max="10"
                    min="0"
                    placeholder="Rate the game"
                  />
                  <div className="input-group-append">{disabled}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row mt-4 mobile-margin">
          <div className="col-12 col-md-5 padding-l-xtra">
            <div className="summary border-all-neon p-3 rounded">
              <div className="summary-head border-bottom-neon mb-2">
                <h5 className="neon-green d-inline-block mb-1">Summary</h5>
                {deleteButton}
                {editButton}
              </div>
              <div className="long-content">
                <p className="neon-green">{this.props.game.summary}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7 padding-l-xtra mobile-margin">
            <div className="comments-container border-all-neon">
              <div className="comments-list bg-dark p-2" id="allComments">
                {comments}
              </div>
              <form id="comment-form" className="comment-form" method="POST">
                <input
                  id="postId-input"
                  type="hidden"
                  name="post_id"
                  value={this.props.currentPost}
                />
                <input
                  id="userId-input"
                  type="hidden"
                  name="user_id"
                  value={this.props.cookie.userId}
                />
                <div className="input-group">
                  <textarea
                    id="comment-input"
                    className="comments-text bg-dark neon-green form-control"
                    name="message"
                    placeholder="Comment on the game"
                  />
                  <div className="input-group-append">{disableComment}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <script type="text/javascript" src="/js/rate.js" />
      </Default>
    );
  }
}

module.exports = Game;
