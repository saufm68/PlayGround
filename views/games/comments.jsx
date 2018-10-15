const React = require('react');
const Default = require('../layout/Default');

class Comments extends React.Component {

    render() {

        var comments;

        let backUrl = `/games/${this.props.currentPost}`;

        if (this.props.comments.length > 0) {

            comments = this.props.comments.map((element) => {

                let userLink = `/users/${element.user_id}`;

                return <div key={element.id} className='specific-comment'>
                    <div>
                        <h3 className='comment-header left'><a href={userLink}>{element.username}</a></h3>
                        <h3 className='comment-header right'>{element.dt}</h3>
                    </div>
                    <p className='comment-body'>{element.message}</p>
                    </div>
            });
        }

        return(

            <Default cookie={this.props.cookie} title='Comments'>
                <h1 className='header'>{this.props.comments[0].title}</h1>
                <div className='overall-comments-container'>
                    <h2 className='header'>Comments</h2>
                    <div className='comments-list'>
                        {comments}
                    </div>
                    <a href={backUrl}><button className='back-button'>Back</button></a>
                </div>
            </Default>
    )};
};

module.exports = Comments;