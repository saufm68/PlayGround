const React = require("react");

class Structure extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="/dp/Pg.png" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" type="text/css" href="/css/structure.css" />
          <title>PlayGround</title>
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

module.exports = Structure;
