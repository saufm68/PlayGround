const React = require("react");
const Default = require("../layout/default");

class EditForm extends React.Component {
  render() {
    let date = new Date();
    date = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

    let image = this.props.post.displayimage;
    let editLink = `/games/${this.props.currentPost}?_method=PUT`;

    return (
      <Default cookie={this.props.cookie}>
        <div className="row mb-3">
          <div className="col m-l-xtra">
            <h4 className="neon-green border-bottom-neon">EDIT GAME</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 img-container m-l-xtra">
            <img id="initial-pic" src={image} className="image" />
          </div>
          <div className="col-12 col-md-6 padding-l-xtra">
            <form
              className="edit-form"
              method="POST"
              action={editLink}
              encType="multipart/form-data"
            >
              <div className="custom-file">
                <input
                  className="custom-file-input"
                  id="pic"
                  type="file"
                  name="displayimage"
                  accept="image/*"
                />
                <label
                  id="fileLabel"
                  className="custom-file-label bg-dark"
                  htmlFor="customFile"
                >
                  Choose display picture
                </label>
              </div>
              <div className="form-row mt-1">
                <div className="col">
                  <h6 className="neon-green">Title:</h6>
                  <input
                    className="bg-dark form-control neon-green longText"
                    type="text"
                    name="title"
                    defaultValue={this.props.post.title}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-row mt-1">
                <div className="col">
                  <h6 className="neon-green">Link:</h6>
                  <input
                    className="bg-dark form-control neon-green longText"
                    type="text"
                    name="link"
                    defaultValue={this.props.post.link}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-row mt-1">
                <div className="col">
                  <h6 className="neon-green">Summary:</h6>
                  <textarea
                    className="bg-dark form-control neon-green longText"
                    rows="4"
                    name="summary"
                    defaultValue={this.props.post.summary}
                  />
                </div>
              </div>
              <input type="hidden" name="dt" value={date} />
              <input type="hidden" name="displayimage" value={image} />
              <input
                className="btn btn-outline-success btn-block mt-2"
                type="submit"
                value="Update"
              />
            </form>
          </div>
        </div>
        <script type="text/javascript" src="/js/upload.js" />
      </Default>
    );
  }
}

module.exports = EditForm;
