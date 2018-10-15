const React = require('react');
const Default = require('../layout/Default');

class EditForm extends React.Component {

    render() {

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

        let image = this.props.post.displayimage;
        let editLink = `/games/${this.props.currentPost}?_method=PUT`;
        let edit = `/games/${this.props.currentPost}`;

        return (

            <Default cookie={this.props.cookie} title='Edit'>
                <h1>EDIT GAME</h1>
                <img id='initial-pic' src={image} />
                <form className='edit-form' method='POST' action={editLink} encType='multipart/form-data'>
                    <input id='pic' type='file' name='displayimage'  />
                    <h2>Title:</h2>
                    <input type='text' name='title' defaultValue={this.props.post.title} />
                    <h2>Summary:</h2>
                    <textarea className='summary' name='summary' defaultValue={this.props.post.summary}></textarea>
                    <h2>Link:</h2>
                    <input type='text' name='link' defaultValue={this.props.post.link} />
                    <input type='hidden' name='dt' value={date} />
                    <input type='submit' value='Update' />
                </form>
                <script type="text/javascript" src='/js/upload.js'></script>
            </Default>

    )};
};

module.exports = EditForm;