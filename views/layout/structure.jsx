const React = require('react');

class Structure extends React.Component {

    render() {

        return (

            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/structure.css" />
                    <title>{this.props.title}</title>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
    )};
};

module.exports = Structure;