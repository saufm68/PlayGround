const React = require("react");
const Structure = require("../layout/structure");

class Login extends React.Component {
  render() {
    let nope;

    if (this.props.check === "true") {
      nope = <div className="nope">Username/Password id incorrect</div>;
    }

    return (
      <Structure>
        <div className="jumbotron text-center jumbo login">
          <h1 className="mb-3">PlayGround</h1>
          {nope}
          <form className="mx-auto" method="POST" action="/login">
            <input
              className="input mt-4 "
              type="text"
              name="username"
              placeholder=" Username"
              required
              autoComplete="off"
            />
            <br />
            <input
              className="input my-4"
              type="password"
              name="password"
              placeholder=" Password"
              required
            />
            <br />
            <input className="btn btn-block mb-5" type="submit" value="Login" />
          </form>
          <div className="links-container mx-auto">
            <a href="/" className="link float-left">
              Back to home
            </a>
            <a href="/register" className="link float-right">
              Don't Have An Account Yet?
            </a>
          </div>
        </div>
      </Structure>
    );
  }
}

module.exports = Login;
