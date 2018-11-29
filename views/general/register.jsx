const React = require("react");
const Structure = require("../layout/structure");

class Register extends React.Component {
  render() {
    let nope;

    if (this.props.check === "true") {
      nope = <div className="nope">The Username Has Already Been Taken</div>;
    }

    return (
      <Structure>
        <div className="jumbotron text-center jumbo register">
          <h1 className="mb-3">PlayGround</h1>
          {nope}
          <form className="mx-auto" method="POST" action="/register">
            <input
              className="input mt-4"
              type="text"
              name="username"
              placeholder=" Username"
              required
              autoComplete="off"
            />
            <br />
            <input
              className="input mt-4"
              type="number"
              name="age"
              placeholder=" Age"
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
            <input
              className="btn btn-block mb-5"
              type="submit"
              value="Register"
            />
          </form>
          <div className="links-container mx-auto">
            <a href="/" className="link float-left">
              Back to home
            </a>
            <a href="/login" className="link float-right">
              Already Have An Account?
            </a>
          </div>
        </div>
      </Structure>
    );
  }
}

module.exports = Register;
