const React = require('react');

class Structure extends React.Component {

    render() {

        return (

            <html>
                <head>
                    {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
                    <link rel="icon" type="image/png" href="/dp/Pg.png" />
                    <link rel="stylesheet" type="text/css" href="/css/structure.css" />
                    <title>PlayGround</title>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
    )};
};

module.exports = Structure;