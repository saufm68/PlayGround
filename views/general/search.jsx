const React = require('react');
const Default = require('../layout/Default');

class Search extends React.Component {

    render() {

        if(this.props.result.length > 0) {
            var result = this.props.result.map((element) => {
                let link = `/games/${element.id}`;
                return <a key={element.id} href={link}><img className='gameDisplay' src={element.displayimage} /></a>
            });
        } else {
            var result = <h1>No Results Found</h1>
        }

        return(

            <Default cookie={this.props.cookie} title='title'>
                <h2 className='header'>{this.props.show}</h2>
                <div className='full-wrapper'>{result}</div>
            </Default>

    )};
};

module.exports = Search;