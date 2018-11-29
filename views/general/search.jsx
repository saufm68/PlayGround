const React = require("react");
const Default = require("../layout/default");

class Search extends React.Component {
  render() {
    if (this.props.result.length > 0) {
      var result = this.props.result.map(element => {
        let link = `/games/${element.id}`;
        return (
          <a key={element.id} href={link}>
            <div
              className="card bg-dark d-inline-block mr-4 mb-3 text-center"
              style={{ width: 200 + "px" }}
            >
              <img
                className="card-img-top"
                src={element.displayimage}
                width="200px"
                height="200px"
                alt={element.title}
              />
              <div className="card-body bg-dark">
                <h6 className="card-title neon-green mb-2">{element.title}</h6>
                <p className="card-text neon-green">
                  <i className="fas fa-star" /> {element.rating}
                </p>
              </div>
            </div>
          </a>
        );
      });
    } else {
      var result = <h3 className="neon-green pt-4">No Results Found</h3>;
    }

    return (
      <Default cookie={this.props.cookie}>
        <h2 className="neon-green border-bottom-neon mb-3 m-l-xtra">
          {this.props.show}
        </h2>
        <div className="full-wrapper m-l-xtra">{result}</div>
      </Default>
    );
  }
}

module.exports = Search;
