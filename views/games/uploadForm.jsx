const React = require("react");
const Default = require("../layout/default");

class UploadForm extends React.Component {
  render() {
    let date = new Date();
    date = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

    let tags = this.props.tags.map(element => {
      return (
        <div className="d-inline-block" key={element.id}>
          <input type="checkbox" name="tag" value={element.id} />
          <h6 className="neon-green d-inline-block ml-1">{element.tag}</h6>
        </div>
      );
    });

    return (
      <Default cookie={this.props.cookie}>
        <div className="row mb-3">
          <div className="col">
            <h4 className="neon-green border-bottom-neon">UPLOAD GAME</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <img
              id="initial-pic"
              src="/dp/defaultpic.png"
              width="380px"
              height="360px"
            />
          </div>
          <div className="col-6">
            <div className="custom-file">
              <input
                className="custom-file-input neon-green"
                id="pic"
                type="file"
                name="displayimage"
                accept="image/*"
                form="upload-form"
              />
              <label
                id="fileLabel"
                className="custom-file-label bg-dark"
                htmlFor="customFile"
              >
                Choose display picture
              </label>
            </div>
            <h6 className="neon-green mt-3 mb-2">Title:</h6>
            <input
              className="bg-dark form-control neon-green longText"
              type="text"
              name="title"
              placeholder="Enter Title"
              form="upload-form"
              required
              autoComplete="off"
            />
            <h6 className="neon-green mt-3 mb-2">Summary:</h6>
            <textarea
              className="bg-dark form-control neon-green longText"
              name="summary"
              placeholder="Enter A Short Summary Of The Game"
              rows="4"
              form="upload-form"
            />
            <h6 className="neon-green mt-3 mb-2">Link:</h6>
            <input
              className="bg-dark form-control neon-green longText"
              type="text"
              name="link"
              placeholder="Enter the link to the game"
              form="upload-form"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <form
              id="upload-form"
              className="upload-form"
              method="POST"
              action="/games"
              encType="multipart/form-data"
            >
              <input type="hidden" name="dt" value={date} />
              <input type="hidden" name="rating" value="0" />
              <input
                type="hidden"
                name="displayimage"
                value="/dp/defaultpic.png"
              />
              <h5 className="neon-green text-center mb-3">Tags</h5>
              <div className="tags-holder">{tags}</div>
              <input
                className="btn btn-outline-success btn-block"
                type="submit"
                value="Upload"
              />
            </form>
          </div>
        </div>
        <script type="text/javascript" src="/js/upload.js" />
      </Default>
    );
  }
}

module.exports = UploadForm;
