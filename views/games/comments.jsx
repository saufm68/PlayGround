const React = require('react');
const Default = require('../layout/Default');

class Comments extends React.Component {

    render() {

        var comments;

        let backUrl = `/games/${this.props.currentPost}`;

        if (this.props.comments.length > 0) {

            comments = this.props.comments.map((element) => {

                let userLink = `/users/${element.user_id}`;

                return <div key={element.id} className='comments-list'>
                    <div>
                        <h3 className='comment-header'><a href={userLink}>{element.username}</a></h3>
                        <h3 className='comment-header'>{element.dt}</h3>
                    </div>
                    <p className='comment-body'>{element.message}</p>
                    </div>
            });
        }

        return(

            <Default cookie={this.props.cookie} title='Comments'>
                <h1>{this.props.comments.title}</h1>
                <div className='overall-comments-container'>
                    <h2>Comments</h2>
                    {comments}
                    <a href={backUrl}><button>Back</button></a>
                </div>
            </Default>
    )};
};

module.exports = Comments;