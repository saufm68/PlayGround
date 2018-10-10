const React = require('react');
const Default = require('../layout/Default');

class Comments extends React.Component {

    render() {

        var comments;

        if (this.props.comments.length > 0) {

            comments = this.props.comments.map((element) => {

                let userLink = `/users/${this.props.comments.user_id}`;

                return <div key={element.id} className='comments-list'>
                    <div>
                        <h3 className='comment-header'><a href={userLink}>{this.props.comments.username}</a></h3>
                        <h3 className='comment-header'>{this.props.comments.dt}</h3>
                    </div>
                    <p className='comment-body'>{this.props.comments.message}</p>
                    </div>
            });
        }

        return(

            <Default cookie={this.props.cookie} title='Comments'>
                <h1>{this.props.comments.title}</h1>
                <div className='overall-comments-container'>
                    <h2>Comments</h2>
                    {comments}
                </div>
            </Default>
    )};
};

module.exports = Comments;